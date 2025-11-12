from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, date
import uuid

app = FastAPI(title="OrthoManager API", version="1.0.0")

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "OrthoManager Backend",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/")
async def root():
    return {
        "message": "OrthoManager API",
        "status": "running",
        "docs": "/docs"
    }

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

# Pydantic models complets
class MetriquesActivite(BaseModel):
    debuts_traitement: int = 0
    cumul_debuts_traitement: int = 0
    premieres_consultations: int = 0
    cumul_premieres_consultations: int = 0
    deposes: int = 0
    cumul_deposes: int = 0
    recettes_mois: float = 0.0
    cumul_recettes: float = 0.0
    rdv_manques: int = 0
    rdv_presents: int = 0
    taux_rdv_manques: float = 0.0

class RessourcesHumaines(BaseModel):
    jours_collaborateur: int = 0
    jours_dr_vergez: int = 0

class ConsultationsCSE(BaseModel):
    nombre_cse: int = 0
    cumul_cse: int = 0
    en_traitement_attente_cse: int = 0
    cumul_traitement_cse: int = 0
    taux_transformation_cse: float = 0.0

class DiagnosticsEnfants(BaseModel):
    nombre_diagnostics_enfants: int = 0
    cumul_diag_enfants: int = 0
    en_traitement_attente_enfants: int = 0
    cumul_traitement_diag: int = 0
    taux_transformation_enfants: float = 0.0

class ConsultationsCSA(BaseModel):
    nombre_csa: int = 0
    cumul_csa: int = 0
    en_traitement_attente_csa: int = 0
    cumul_traitement_csa: int = 0
    taux_transformation_csa: float = 0.0

class Devis(BaseModel):
    total_devis_acceptes: float = 0.0
    nombre_devis_acceptes: int = 0

class ComparaisonsAnnuelles(BaseModel):
    debuts_traitement_evolution: float = 0.0
    premieres_consultations_evolution: float = 0.0
    deposes_evolution: float = 0.0
    recettes_evolution: float = 0.0
    rdv_manques_evolution: float = 0.0
    rdv_presents_evolution: float = 0.0
    jours_collaborateur_evolution: float = 0.0
    jours_vergez_evolution: float = 0.0
    cse_evolution: float = 0.0
    cse_traitement_evolution: float = 0.0
    diagnostics_enfants_evolution: float = 0.0
    diagnostics_traitement_evolution: float = 0.0
    csa_evolution: float = 0.0
    csa_traitement_evolution: float = 0.0
    devis_total_evolution: float = 0.0
    devis_nombre_evolution: float = 0.0

class TableauBordComplet(BaseModel):
    id: str = None
    mois: str
    annee: int
    metriques_activite: MetriquesActivite = MetriquesActivite()
    ressources_humaines: RessourcesHumaines = RessourcesHumaines()
    consultations_cse: ConsultationsCSE = ConsultationsCSE()
    diagnostics_enfants: DiagnosticsEnfants = DiagnosticsEnfants()
    consultations_csa: ConsultationsCSA = ConsultationsCSA()
    devis: Devis = Devis()
    comparaisons: ComparaisonsAnnuelles = ComparaisonsAnnuelles()
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
        if '_id' in doc:
            del doc['_id']
        for key, value in doc.items():
            if isinstance(value, dict):
                doc[key] = clean_mongo_doc(value)
            elif isinstance(value, list):
                doc[key] = [clean_mongo_doc(item) if isinstance(item, dict) else item for item in value]
    return doc

def calculer_recommandations_completes(donnees: TableauBordComplet, donnees_precedentes: Optional[TableauBordComplet] = None) -> List[Dict]:
    recommandations = []
    
    # Analyse du taux de transformation CSE
    if donnees.consultations_cse.taux_transformation_cse < 20:
        recommandations.append({
            "type": "alerte",
            "categorie": "Transformation CSE",
            "titre": "Taux de transformation CSE critique",
            "description": f"Le taux de transformation CSE ({donnees.consultations_cse.taux_transformation_cse}%) est très bas. Objectif recommandé : >25%. Analysez les causes et renforcez l'accompagnement post-consultation.",
            "priorite": 1
        })
    
    # Analyse du taux de RDV manqués
    if donnees.metriques_activite.taux_rdv_manques > 15:
        recommandations.append({
            "type": "alerte",
            "categorie": "Organisation",
            "titre": "Taux de RDV manqués élevé",
            "description": f"Taux de RDV manqués : {donnees.metriques_activite.taux_rdv_manques:.1f}%. Objectif : <15%. Renforcez les rappels automatiques et la communication patient.",
            "priorite": 1
        })
    
    # Analyse des recettes vs objectif
    if donnees.metriques_activite.recettes_mois < 170000:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Performance Financière",
            "titre": "Objectif de recettes non atteint",
            "description": f"Recettes mensuelles ({donnees.metriques_activite.recettes_mois:,.0f}€) sous l'objectif de 170K€. Analysez les débuts de traitement et la conversion des devis.",
            "priorite": 2
        })
    elif donnees.metriques_activite.recettes_mois > 180000:
        recommandations.append({
            "type": "info",
            "categorie": "Performance Financière",
            "titre": "Excellent mois financier",
            "description": f"Recettes mensuelles ({donnees.metriques_activite.recettes_mois:,.0f}€) dépassent l'objectif ! Continuez cette dynamique.",
            "priorite": 3
        })
    
    # Analyse du taux de transformation enfants
    if donnees.diagnostics_enfants.taux_transformation_enfants < 70:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Pédodontie",
            "titre": "Améliorer la conversion en pédodontie",
            "description": f"Taux de transformation enfants ({donnees.diagnostics_enfants.taux_transformation_enfants}%) sous l'objectif de 70%. Renforcez l'approche famille et la pédagogie.",
            "priorite": 2
        })
    elif donnees.diagnostics_enfants.taux_transformation_enfants > 75:
        recommandations.append({
            "type": "info",
            "categorie": "Pédodontie",
            "titre": "Excellente performance en pédodontie",
            "description": f"Taux de transformation enfants ({donnees.diagnostics_enfants.taux_transformation_enfants}%) excellent ! Reproduisez cette approche.",
            "priorite": 3
        })
    
    # Analyse CSA (problématique si 0%)
    if donnees.consultations_csa.taux_transformation_csa == 0 and donnees.consultations_csa.nombre_csa > 0:
        recommandations.append({
            "type": "alerte",
            "categorie": "Transformation CSA",
            "titre": "Aucune conversion CSA",
            "description": f"{donnees.consultations_csa.nombre_csa} consultations CSA sans conversion. Revoyez le processus et la tarification des appareillages.",
            "priorite": 1
        })
    
    # Analyse des devis
    if donnees.devis.nombre_devis_acceptes < 25:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Commercial",
            "titre": "Augmenter les devis acceptés",
            "description": f"Seulement {donnees.devis.nombre_devis_acceptes} devis acceptés ce mois (objectif : 30). Travaillez la présentation et le closing commercial.",
            "priorite": 2
        })
    
    # Recommandations sur les évolutions négatives
    if donnees.comparaisons.recettes_evolution < -10:
        recommandations.append({
            "type": "alerte",
            "categorie": "Évolution Financière",
            "titre": "Forte baisse des recettes vs N-1",
            "description": f"Recettes en baisse de {abs(donnees.comparaisons.recettes_evolution):.1f}% vs année précédente. Plan d'action commercial urgent requis.",
            "priorite": 1
        })
    
    if donnees.comparaisons.premieres_consultations_evolution < -20:
        recommandations.append({
            "type": "alerte",
            "categorie": "Acquisition Patient",
            "titre": "Forte chute des consultations",
            "description": f"Consultations en baisse de {abs(donnees.comparaisons.premieres_consultations_evolution):.1f}% vs N-1. Renforcez urgentement les actions marketing et partenariats.",
            "priorite": 1
        })
    
    # Analyse de la charge de travail Dr Vergez
    if donnees.ressources_humaines.jours_dr_vergez < 10:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Organisation RH",
            "titre": "Optimiser la présence Dr Vergez",
            "description": f"Dr Vergez présent seulement {donnees.ressources_humaines.jours_dr_vergez} jours ce mois. Évaluez si c'est suffisant pour l'activité et les nouveaux patients.",
            "priorite": 2
        })
    
    return recommandations

# Fonction pour initialiser les données historiques COMPLÈTES
async def init_historical_complete_data():
    """Initialise les données historiques complètes mars-mai 2025"""
    donnees_historiques_completes = [
        {
            "id": generate_id(),
            "mois": "mars",
            "annee": 2025,
            "metriques_activite": {
                "debuts_traitement": 48,
                "cumul_debuts_traitement": 201,
                "premieres_consultations": 43,
                "cumul_premieres_consultations": 299,
                "deposes": 21,
                "cumul_deposes": 134,
                "recettes_mois": 176000.0,
                "cumul_recettes": 969000.0,
                "rdv_manques": 159,
                "rdv_presents": 878,
                "taux_rdv_manques": 18.0
            },
            "ressources_humaines": {
                "jours_collaborateur": 20,
                "jours_dr_vergez": 12
            },
            "consultations_cse": {
                "nombre_cse": 22,
                "cumul_cse": 155,
                "en_traitement_attente_cse": 1,
                "cumul_traitement_cse": 32,
                "taux_transformation_cse": 5.0
            },
            "diagnostics_enfants": {
                "nombre_diagnostics_enfants": 19,
                "cumul_diag_enfants": 135,
                "en_traitement_attente_enfants": 14,
                "cumul_traitement_diag": 106,
                "taux_transformation_enfants": 74.0
            },
            "consultations_csa": {
                "nombre_csa": 21,
                "cumul_csa": 142,
                "en_traitement_attente_csa": 0,
                "cumul_traitement_csa": 4,
                "taux_transformation_csa": 0.0
            },
            "devis": {
                "total_devis_acceptes": 79000.0,
                "nombre_devis_acceptes": 18
            },
            "comparaisons": {
                "debuts_traitement_evolution": 37.0,
                "premieres_consultations_evolution": -42.0,
                "deposes_evolution": -9.0,
                "recettes_evolution": -10.0,
                "rdv_manques_evolution": 6.0,
                "rdv_presents_evolution": -5.0,
                "jours_collaborateur_evolution": 11.0,
                "jours_vergez_evolution": -20.0,
                "cse_evolution": -46.0,
                "cse_traitement_evolution": -94.0,
                "diagnostics_enfants_evolution": -49.0,
                "diagnostics_traitement_evolution": -42.0,
                "csa_evolution": -36.0,
                "csa_traitement_evolution": -100.0,
                "devis_total_evolution": -65.0,
                "devis_nombre_evolution": -59.0
            },
            "date_creation": datetime(2025, 4, 1, 10, 0, 0),
            "date_modification": datetime(2025, 4, 1, 10, 0, 0)
        },
        {
            "id": generate_id(),
            "mois": "avril",
            "annee": 2025,
            "metriques_activite": {
                "debuts_traitement": 37,
                "cumul_debuts_traitement": 238,
                "premieres_consultations": 35,
                "cumul_premieres_consultations": 334,
                "deposes": 23,
                "cumul_deposes": 157,
                "recettes_mois": 166000.0,
                "cumul_recettes": 1135000.0,
                "rdv_manques": 148,
                "rdv_presents": 880,
                "taux_rdv_manques": 17.0
            },
            "ressources_humaines": {
                "jours_collaborateur": 19,
                "jours_dr_vergez": 9
            },
            "consultations_cse": {
                "nombre_cse": 19,
                "cumul_cse": 174,
                "en_traitement_attente_cse": 0,
                "cumul_traitement_cse": 32,
                "taux_transformation_cse": 0.0
            },
            "diagnostics_enfants": {
                "nombre_diagnostics_enfants": 14,
                "cumul_diag_enfants": 149,
                "en_traitement_attente_enfants": 5,
                "cumul_traitement_diag": 111,
                "taux_transformation_enfants": 36.0
            },
            "consultations_csa": {
                "nombre_csa": 16,
                "cumul_csa": 158,
                "en_traitement_attente_csa": 0,
                "cumul_traitement_csa": 4,
                "taux_transformation_csa": 0.0
            },
            "devis": {
                "total_devis_acceptes": 111000.0,
                "nombre_devis_acceptes": 20
            },
            "comparaisons": {
                "debuts_traitement_evolution": 23.0,
                "premieres_consultations_evolution": -46.0,
                "deposes_evolution": 10.0,
                "recettes_evolution": 5.0,
                "rdv_manques_evolution": 11.0,
                "rdv_presents_evolution": 6.0,
                "jours_collaborateur_evolution": 6.0,
                "jours_vergez_evolution": -25.0,
                "cse_evolution": -41.0,
                "cse_traitement_evolution": -100.0,
                "diagnostics_enfants_evolution": -50.0,
                "diagnostics_traitement_evolution": -75.0,
                "csa_evolution": -52.0,
                "csa_traitement_evolution": -100.0,
                "devis_total_evolution": -33.0,
                "devis_nombre_evolution": -41.0
            },
            "date_creation": datetime(2025, 5, 1, 10, 0, 0),
            "date_modification": datetime(2025, 5, 1, 10, 0, 0)
        },
        {
            "id": generate_id(),
            "mois": "mai",
            "annee": 2025,
            "metriques_activite": {
                "debuts_traitement": 41,
                "cumul_debuts_traitement": 279,
                "premieres_consultations": 37,
                "cumul_premieres_consultations": 371,
                "deposes": 22,
                "cumul_deposes": 179,
                "recettes_mois": 167000.0,
                "cumul_recettes": 1302000.0,
                "rdv_manques": 131,
                "rdv_presents": 900,
                "taux_rdv_manques": 15.0
            },
            "ressources_humaines": {
                "jours_collaborateur": 19,
                "jours_dr_vergez": 13
            },
            "consultations_cse": {
                "nombre_cse": 20,
                "cumul_cse": 194,
                "en_traitement_attente_cse": 3,
                "cumul_traitement_cse": 35,
                "taux_transformation_cse": 15.0
            },
            "diagnostics_enfants": {
                "nombre_diagnostics_enfants": 19,
                "cumul_diag_enfants": 168,
                "en_traitement_attente_enfants": 15,
                "cumul_traitement_diag": 126,
                "taux_transformation_enfants": 79.0
            },
            "consultations_csa": {
                "nombre_csa": 17,
                "cumul_csa": 175,
                "en_traitement_attente_csa": 0,
                "cumul_traitement_csa": 4,
                "taux_transformation_csa": 0.0
            },
            "devis": {
                "total_devis_acceptes": 120000.0,
                "nombre_devis_acceptes": 23
            },
            "comparaisons": {
                "debuts_traitement_evolution": 37.0,
                "premieres_consultations_evolution": -3.0,
                "deposes_evolution": -12.0,
                "recettes_evolution": 1.0,
                "rdv_manques_evolution": 9.0,
                "rdv_presents_evolution": 12.0,
                "jours_collaborateur_evolution": 6.0,
                "jours_vergez_evolution": 30.0,
                "cse_evolution": 33.0,
                "cse_traitement_evolution": -50.0,
                "diagnostics_enfants_evolution": -5.0,
                "diagnostics_traitement_evolution": 7.0,
                "csa_evolution": -26.0,
                "csa_traitement_evolution": -100.0,
                "devis_total_evolution": -26.0,
                "devis_nombre_evolution": -26.0
            },
            "date_creation": datetime(2025, 6, 1, 10, 0, 0),
            "date_modification": datetime(2025, 6, 1, 10, 0, 0)
        }
    ]
    
    # Vérifier si les données existent déjà
    for donnee in donnees_historiques_completes:
        existing = await db.tableaux_bord_complets.find_one({
            "mois": donnee["mois"], 
            "annee": donnee["annee"]
        })
        if not existing:
            await db.tableaux_bord_complets.insert_one(donnee)
            print(f"Données complètes ajoutées pour {donnee['mois']} {donnee['annee']}")

# API Routes
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Cabinet Dr Vergez - Tableau de bord complet"}

@app.on_event("startup")
async def startup_event():
    """Initialise les données historiques complètes au démarrage"""
    await init_historical_complete_data()

@app.post("/api/tableau-bord-complet")
async def creer_tableau_bord_complet(donnees: TableauBordComplet):
    try:
        existing = await db.tableaux_bord_complets.find_one({
            "mois": donnees.mois,
            "annee": donnees.annee
        })
        
        if existing:
            donnees.id = existing["id"]
            donnees.date_modification = datetime.utcnow()
            donnees_dict = donnees.dict()
            
            await db.tableaux_bord_complets.update_one(
                {"id": existing["id"]},
                {"$set": donnees_dict}
            )
        else:
            donnees.id = generate_id()
            donnees.date_creation = datetime.utcnow()
            donnees.date_modification = datetime.utcnow()
            donnees_dict = donnees.dict()
            await db.tableaux_bord_complets.insert_one(donnees_dict)
        
        # Générer les recommandations
        donnees_annee_precedente = await db.tableaux_bord_complets.find_one({
            "mois": donnees.mois,
            "annee": donnees.annee - 1
        })
        
        precedentes_donnees = None
        if donnees_annee_precedente:
            precedentes_donnees = TableauBordComplet(**donnees_annee_precedente)
        
        recommandations = calculer_recommandations_completes(donnees, precedentes_donnees)
        
        # Sauvegarder les recommandations
        recommandations_response = []
        for reco in recommandations:
            reco_copy = reco.copy()
            reco_copy["id"] = generate_id()
            reco_copy["date_creation"] = datetime.utcnow()
            await db.recommandations_completes.insert_one(reco_copy)
            
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
            "action": "updated" if existing else "created",
            "recommandations": recommandations_response
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tableau-bord-complet")
async def lister_tableaux_bord_complets():
    try:
        tableaux = await db.tableaux_bord_complets.find({}).sort([("annee", -1), ("date_creation", -1)]).to_list(length=100)
        cleaned_tableaux = [clean_mongo_doc(tableau) for tableau in tableaux]
        return {"tableaux": cleaned_tableaux}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tableau-bord-complet/{tableau_id}")
async def obtenir_tableau_bord_complet(tableau_id: str):
    try:
        tableau = await db.tableaux_bord_complets.find_one({"id": tableau_id})
        if not tableau:
            raise HTTPException(status_code=404, detail="Tableau de bord non trouvé")
        return clean_mongo_doc(tableau)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/tableau-bord-complet/{tableau_id}")
async def modifier_tableau_bord_complet(tableau_id: str, donnees: TableauBordComplet):
    try:
        donnees.date_modification = datetime.utcnow()
        donnees_dict = donnees.dict()
        
        result = await db.tableaux_bord_complets.update_one(
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

@app.get("/api/recommandations-completes")
async def obtenir_recommandations_completes():
    try:
        date_limite = datetime.utcnow().replace(day=1)
        recommandations = await db.recommandations_completes.find({
            "date_creation": {"$gte": date_limite}
        }).sort("priorite", 1).to_list(length=50)
        
        cleaned_recommandations = [clean_mongo_doc(reco) for reco in recommandations]
        return {"recommandations": cleaned_recommandations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/statistiques-completes")
async def obtenir_statistiques_completes():
    try:
        total_tableaux = await db.tableaux_bord_complets.count_documents({})
        
        pipeline = [
            {"$sort": {"annee": -1, "date_creation": -1}},
            {"$limit": 6},
            {"$group": {
                "_id": None,
                "moyenne_recettes": {"$avg": "$metriques_activite.recettes_mois"},
                "moyenne_debuts_traitement": {"$avg": "$metriques_activite.debuts_traitement"},
                "moyenne_consultations": {"$avg": "$metriques_activite.premieres_consultations"},
                "moyenne_taux_transformation_enfants": {"$avg": "$diagnostics_enfants.taux_transformation_enfants"},
                "moyenne_taux_transformation_cse": {"$avg": "$consultations_cse.taux_transformation_cse"},
                "moyenne_rdv_presents": {"$avg": "$metriques_activite.rdv_presents"}
            }}
        ]
        
        stats = await db.tableaux_bord_complets.aggregate(pipeline).to_list(length=1)
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