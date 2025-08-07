from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, date
import uuid

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(MONGO_URL)
db = client.orthodontie_vergez

# Pydantic models
class MetriquesActivite(BaseModel):
    debuts_traitement: int = 0
    premieres_consultations: int = 0
    deposes: int = 0
    recettes_mois: float = 0.0
    rdv_manques: int = 0
    rdv_presents: int = 0

class RessourcesHumaines(BaseModel):
    jours_collaborateur: int = 0
    jours_dr_vergez: int = 0

class ConsultationsCSE(BaseModel):
    nombre_cse: int = 0
    en_traitement_attente_cse: int = 0
    taux_transformation_cse: float = 0.0

class DiagnosticsEnfants(BaseModel):
    nombre_diagnostics_enfants: int = 0
    en_traitement_attente_enfants: int = 0
    taux_transformation_enfants: float = 0.0

class ConsultationsCSA(BaseModel):
    nombre_csa: int = 0
    en_traitement_attente_csa: int = 0
    taux_transformation_csa: float = 0.0

class Devis(BaseModel):
    total_devis_acceptes: float = 0.0
    nombre_devis_acceptes: int = 0

class Comparaisons(BaseModel):
    debuts_traitement_evolution: float = 0.0
    consultations_evolution: float = 0.0
    deposes_evolution: float = 0.0
    recettes_evolution: float = 0.0
    rdv_manques_evolution: float = 0.0
    rdv_presents_evolution: float = 0.0
    jours_collaborateur_evolution: float = 0.0
    jours_vergez_evolution: float = 0.0
    cse_evolution: float = 0.0
    diagnostics_enfants_evolution: float = 0.0
    csa_evolution: float = 0.0
    devis_evolution: float = 0.0

class TableauBordVergez(BaseModel):
    id: str = None
    mois: str
    annee: int
    metriques_activite: MetriquesActivite = MetriquesActivite()
    ressources_humaines: RessourcesHumaines = RessourcesHumaines()
    consultations_cse: ConsultationsCSE = ConsultationsCSE()
    diagnostics_enfants: DiagnosticsEnfants = DiagnosticsEnfants()
    consultations_csa: ConsultationsCSA = ConsultationsCSA()
    devis: Devis = Devis()
    comparaisons: Comparaisons = Comparaisons()
    date_creation: datetime = None
    date_modification: datetime = None

class Recommandation(BaseModel):
    id: str = None
    type: str  # 'alerte', 'suggestion', 'info'
    categorie: str
    titre: str
    description: str
    priorite: int  # 1=haute, 2=moyenne, 3=basse
    date_creation: datetime = None

class RectificationRecettes(BaseModel):
    id: str = None
    mois: str
    annee: int
    montant_initial: float
    montant_rectifie: float
    raison: str = ""
    date_rectification: datetime = None

# Helper functions
def generate_id():
    return str(uuid.uuid4())

def clean_mongo_doc(doc):
    """Remove MongoDB ObjectId fields that cause serialization issues"""
    if isinstance(doc, dict):
        # Remove the _id field if it exists
        if '_id' in doc:
            del doc['_id']
        # Recursively clean nested dictionaries
        for key, value in doc.items():
            if isinstance(value, dict):
                doc[key] = clean_mongo_doc(value)
            elif isinstance(value, list):
                doc[key] = [clean_mongo_doc(item) if isinstance(item, dict) else item for item in value]
    return doc

def calculer_recommandations_vergez(donnees: TableauBordVergez, donnees_precedentes: Optional[TableauBordVergez] = None) -> List[Dict]:
    recommandations = []
    
    # Analyse du taux de transformation CSE
    if donnees.consultations_cse.taux_transformation_cse < 20:
        recommandations.append({
            "type": "alerte",
            "categorie": "Transformation",
            "titre": "Taux de transformation CSE faible",
            "description": f"Le taux de transformation CSE ({donnees.consultations_cse.taux_transformation_cse}%) est très bas. Analysez les causes et améliorez le processus de conversion.",
            "priorite": 1
        })
    
    # Analyse des rendez-vous manqués
    taux_rdv_manques = (donnees.metriques_activite.rdv_manques / (donnees.metriques_activite.rdv_manques + donnees.metriques_activite.rdv_presents) * 100) if (donnees.metriques_activite.rdv_manques + donnees.metriques_activite.rdv_presents) > 0 else 0
    
    if taux_rdv_manques > 12:
        recommandations.append({
            "type": "alerte",
            "categorie": "Organisation",
            "titre": "Taux de rendez-vous manqués élevé",
            "description": f"Taux de RDV manqués : {taux_rdv_manques:.1f}%. Renforcez les rappels et la communication avec les patients.",
            "priorite": 1
        })
    
    # Analyse des recettes
    if donnees.metriques_activite.recettes_mois < 150000:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Recettes",
            "titre": "Objectif de recettes non atteint",
            "description": f"Recettes mensuelles ({donnees.metriques_activite.recettes_mois:,.0f}€) sous l'objectif de 150K€. Renforcez l'activité commerciale.",
            "priorite": 2
        })
    
    # Analyse du taux de transformation enfants
    if donnees.diagnostics_enfants.taux_transformation_enfants < 70:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Pédodontie",
            "titre": "Améliorer la conversion enfants",
            "description": f"Taux de transformation enfants ({donnees.diagnostics_enfants.taux_transformation_enfants}%) peut être amélioré. Renforcez l'approche parents-enfants.",
            "priorite": 2
        })
    elif donnees.diagnostics_enfants.taux_transformation_enfants > 75:
        recommandations.append({
            "type": "info",
            "categorie": "Pédodontie",
            "titre": "Excellente performance enfants",
            "description": f"Taux de transformation enfants ({donnees.diagnostics_enfants.taux_transformation_enfants}%) excellent ! Continuez cette approche.",
            "priorite": 3
        })
    
    # Analyse des devis
    if donnees.devis.nombre_devis_acceptes < 25:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Commercial",
            "titre": "Augmenter les devis acceptés",
            "description": f"Seulement {donnees.devis.nombre_devis_acceptes} devis acceptés ce mois. Travaillez la présentation des devis et le closing.",
            "priorite": 2
        })
    
    # Recommandations sur l'évolution vs année précédente
    if donnees.comparaisons.recettes_evolution < -5:
        recommandations.append({
            "type": "alerte",
            "categorie": "Évolution",
            "titre": "Baisse des recettes vs N-1",
            "description": f"Recettes en baisse de {abs(donnees.comparaisons.recettes_evolution):.1f}% vs année précédente. Action corrective nécessaire.",
            "priorite": 1
        })
    elif donnees.comparaisons.recettes_evolution > 5:
        recommandations.append({
            "type": "info",
            "categorie": "Évolution",
            "titre": "Croissance des recettes",
            "description": f"Recettes en hausse de {donnees.comparaisons.recettes_evolution:.1f}% vs année précédente. Excellente performance !",
            "priorite": 3
        })
    
    # Analyse du temps Dr Vergez
    if donnees.ressources_humaines.jours_dr_vergez < 12:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Planning",
            "titre": "Optimiser le temps Dr Vergez",
            "description": f"Dr Vergez présent seulement {donnees.ressources_humaines.jours_dr_vergez} jours. Évaluez si c'est suffisant pour l'activité.",
            "priorite": 2
        })
    
    return recommandations

# API Routes
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Cabinet Dr Vergez - Tableau de bord"}

@app.post("/api/tableau-bord-vergez")
async def creer_tableau_bord_vergez(donnees: TableauBordVergez):
    try:
        # Générer un ID unique
        donnees.id = generate_id()
        donnees.date_creation = datetime.utcnow()
        donnees.date_modification = datetime.utcnow()
        
        # Convertir en dict pour MongoDB
        donnees_dict = donnees.dict()
        
        # Insérer dans MongoDB
        result = await db.tableaux_bord_vergez.insert_one(donnees_dict)
        
        # Générer les recommandations
        # Chercher le même mois année précédente pour comparaison
        donnees_annee_precedente = await db.tableaux_bord_vergez.find_one({
            "mois": donnees.mois,
            "annee": donnees.annee - 1
        })
        
        precedentes_donnees = None
        if donnees_annee_precedente:
            precedentes_donnees = TableauBordVergez(**donnees_annee_precedente)
        
        recommandations = calculer_recommandations_vergez(donnees, precedentes_donnees)
        
        # Sauvegarder les recommandations
        recommandations_response = []
        for reco in recommandations:
            reco_copy = reco.copy()
            reco_copy["id"] = generate_id()
            reco_copy["date_creation"] = datetime.utcnow()
            await db.recommandations_vergez.insert_one(reco_copy)
            
            # For response, use the original recommendation without datetime
            recommandations_response.append({
                "id": reco_copy["id"],
                "type": reco["type"],
                "categorie": reco["categorie"],
                "titre": reco["titre"],
                "description": reco["description"],
                "priorite": reco["priorite"]
            })
        
        return {
            "success": True,
            "id": donnees.id,
            "recommandations": recommandations_response
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tableau-bord-vergez")
async def lister_tableaux_bord_vergez():
    try:
        tableaux = await db.tableaux_bord_vergez.find({}).sort([("annee", -1), ("mois", -1)]).to_list(length=100)
        # Clean MongoDB ObjectIds
        cleaned_tableaux = [clean_mongo_doc(tableau) for tableau in tableaux]
        return {"tableaux": cleaned_tableaux}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tableau-bord-vergez/{tableau_id}")
async def obtenir_tableau_bord_vergez(tableau_id: str):
    try:
        tableau = await db.tableaux_bord_vergez.find_one({"id": tableau_id})
        if not tableau:
            raise HTTPException(status_code=404, detail="Tableau de bord non trouvé")
        return clean_mongo_doc(tableau)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/tableau-bord-vergez/{tableau_id}")
async def modifier_tableau_bord_vergez(tableau_id: str, donnees: TableauBordVergez):
    try:
        donnees.date_modification = datetime.utcnow()
        donnees_dict = donnees.dict()
        
        result = await db.tableaux_bord_vergez.update_one(
            {"id": tableau_id},
            {"$set": donnees_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Tableau de bord non trouvé")
            
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/tableau-bord-vergez/{tableau_id}")
async def supprimer_tableau_bord_vergez(tableau_id: str):
    try:
        result = await db.tableaux_bord_vergez.delete_one({"id": tableau_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Tableau de bord non trouvé")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recommandations-vergez")
async def obtenir_recommandations_vergez():
    try:
        # Obtenir les recommandations récentes (derniers 30 jours)
        date_limite = datetime.utcnow().replace(day=1)  # Premier jour du mois courant
        recommandations = await db.recommandations_vergez.find({
            "date_creation": {"$gte": date_limite}
        }).sort("priorite", 1).to_list(length=50)
        
        # Clean MongoDB ObjectIds
        cleaned_recommandations = [clean_mongo_doc(reco) for reco in recommandations]
        return {"recommandations": cleaned_recommandations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/rectifications-recettes")
async def creer_rectification(rectification: RectificationRecettes):
    try:
        rectification.id = generate_id()
        rectification.date_rectification = datetime.utcnow()
        
        rectification_dict = rectification.dict()
        result = await db.rectifications_recettes.insert_one(rectification_dict)
        
        return {"success": True, "id": rectification.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/rectifications-recettes")
async def lister_rectifications():
    try:
        rectifications = await db.rectifications_recettes.find({}).sort("date_rectification", -1).to_list(length=50)
        cleaned_rectifications = [clean_mongo_doc(rect) for rect in rectifications]
        return {"rectifications": cleaned_rectifications}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/statistiques-vergez")
async def obtenir_statistiques_vergez():
    try:
        # Statistiques globales
        total_tableaux = await db.tableaux_bord_vergez.count_documents({})
        
        # Moyennes sur les 6 derniers mois
        pipeline = [
            {"$sort": {"annee": -1, "date_creation": -1}},
            {"$limit": 6},
            {"$group": {
                "_id": None,
                "moyenne_recettes": {"$avg": "$metriques_activite.recettes_mois"},
                "moyenne_debuts_traitement": {"$avg": "$metriques_activite.debuts_traitement"},
                "moyenne_consultations": {"$avg": "$metriques_activite.premieres_consultations"},
                "moyenne_taux_transformation_enfants": {"$avg": "$diagnostics_enfants.taux_transformation_enfants"},
                "moyenne_rdv_presents": {"$avg": "$metriques_activite.rdv_presents"}
            }}
        ]
        
        stats = await db.tableaux_bord_vergez.aggregate(pipeline).to_list(length=1)
        statistiques = stats[0] if stats else {}
        
        return {
            "total_tableaux": total_tableaux,
            "statistiques": statistiques
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)