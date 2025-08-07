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
db = client.orthodontie_dashboard

# Pydantic models
class DossiersInactifs(BaseModel):
    nouveaux_cas: int = 0
    consultants_attente: int = 0
    en_attente: int = 0
    abandons: int = 0
    demenagements: int = 0
    soins_termines: int = 0
    traitements_finis: int = 0
    repris_archives: int = 0
    interruptions: int = 0

class DossiersActifs(BaseModel):
    phase_1: int = 0
    phase_2: int = 0
    phase_3: int = 0
    pause: int = 0
    pause_1: int = 0
    pause_2: int = 0
    pause_3: int = 0
    contentions: int = 0

class ActiviteMensuelle(BaseModel):
    premieres_consultations: int = 0
    compte_rendus: int = 0
    debuts_traitement: int = 0
    poses_amovibles: int = 0
    poses_fixes: int = 0
    abandons_departs: int = 0

class RecettesMensuelles(BaseModel):
    especes: float = 0.0
    cheques: float = 0.0
    cartes_bancaires: float = 0.0
    virements: float = 0.0
    prelevements: float = 0.0

class ActeProfessionnel(BaseModel):
    coefficient: float = 0.0
    montant: float = 0.0
    nombre: int = 0

class ActesMensuels(BaseModel):
    cs: ActeProfessionnel = ActeProfessionnel()
    csd: ActeProfessionnel = ActeProfessionnel()
    hn: ActeProfessionnel = ActeProfessionnel()
    to: ActeProfessionnel = ActeProfessionnel()
    z: ActeProfessionnel = ActeProfessionnel()

class TableauBordMensuel(BaseModel):
    id: str = None
    mois: str
    annee: int
    dossiers_inactifs: DossiersInactifs = DossiersInactifs()
    dossiers_actifs: DossiersActifs = DossiersActifs()
    activite: ActiviteMensuelle = ActiviteMensuelle()
    recettes: RecettesMensuelles = RecettesMensuelles()
    actes: ActesMensuels = ActesMensuels()
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

def calculer_recommandations(donnees_actuelles: TableauBordMensuel, donnees_precedentes: Optional[TableauBordMensuel] = None) -> List[Dict]:
    recommandations = []
    
    # Calculer le total des recettes actuelles
    total_recettes = (donnees_actuelles.recettes.especes + 
                     donnees_actuelles.recettes.cheques + 
                     donnees_actuelles.recettes.cartes_bancaires + 
                     donnees_actuelles.recettes.virements + 
                     donnees_actuelles.recettes.prelevements)
    
    # Recommandations basées sur les recettes
    if total_recettes < 150000:
        recommandations.append({
            "type": "alerte",
            "categorie": "Recettes",
            "titre": "Recettes mensuelles faibles",
            "description": f"Les recettes du mois ({total_recettes:,.2f}€) sont inférieures à l'objectif de 150 000€. Analysez les causes et renforcez les actions commerciales.",
            "priorite": 1
        })
    
    # Recommandations sur les consultations
    if donnees_actuelles.activite.premieres_consultations < 40:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Activité",
            "titre": "Augmenter les premières consultations",
            "description": f"Seulement {donnees_actuelles.activite.premieres_consultations} premières consultations ce mois. Renforcez votre communication et vos partenariats.",
            "priorite": 2
        })
    
    # Recommandations sur les abandons
    if donnees_actuelles.activite.abandons_departs > 30:
        recommandations.append({
            "type": "alerte",
            "categorie": "Rétention",
            "titre": "Taux d'abandon élevé",
            "description": f"{donnees_actuelles.activite.abandons_departs} abandons/départs ce mois. Analysez les causes et améliorez le suivi patient.",
            "priorite": 1
        })
    
    # Recommandations sur les modes de paiement
    part_cb = (donnees_actuelles.recettes.cartes_bancaires / total_recettes * 100) if total_recettes > 0 else 0
    if part_cb < 60:
        recommandations.append({
            "type": "suggestion",
            "categorie": "Paiements",
            "titre": "Encourager les paiements par carte",
            "description": f"Les paiements CB ne représentent que {part_cb:.1f}% du total. Encouragez ce mode de paiement pour améliorer la trésorerie.",
            "priorite": 3
        })
    
    # Comparaison avec le mois précédent
    if donnees_precedentes:
        total_precedent = (donnees_precedentes.recettes.especes + 
                          donnees_precedentes.recettes.cheques + 
                          donnees_precedentes.recettes.cartes_bancaires + 
                          donnees_precedentes.recettes.virements + 
                          donnees_precedentes.recettes.prelevements)
        
        evolution = ((total_recettes - total_precedent) / total_precedent * 100) if total_precedent > 0 else 0
        
        if evolution < -10:
            recommandations.append({
                "type": "alerte",
                "categorie": "Évolution",
                "titre": "Baisse significative des recettes",
                "description": f"Baisse de {abs(evolution):.1f}% par rapport au mois précédent. Analysez les causes et adaptez votre stratégie.",
                "priorite": 1
            })
        elif evolution > 10:
            recommandations.append({
                "type": "info",
                "categorie": "Évolution",
                "titre": "Excellente progression",
                "description": f"Hausse de {evolution:.1f}% par rapport au mois précédent. Continuez sur cette lancée !",
                "priorite": 3
            })
    
    return recommandations

# API Routes
@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.post("/api/tableau-bord")
async def creer_tableau_bord(donnees: TableauBordMensuel):
    try:
        # Générer un ID unique
        donnees.id = generate_id()
        donnees.date_creation = datetime.utcnow()
        donnees.date_modification = datetime.utcnow()
        
        # Convertir en dict pour MongoDB
        donnees_dict = donnees.dict()
        
        # Insérer dans MongoDB
        result = await db.tableaux_bord.insert_one(donnees_dict)
        
        # Générer les recommandations
        # Chercher le mois précédent pour comparaison
        mois_precedent = None
        if donnees.mois == "janvier":
            mois_precedent = await db.tableaux_bord.find_one({
                "mois": "décembre", 
                "annee": donnees.annee - 1
            })
        else:
            mois_map = {
                "février": "janvier", "mars": "février", "avril": "mars",
                "mai": "avril", "juin": "mai", "juillet": "juin",
                "août": "juillet", "septembre": "août", "octobre": "septembre",
                "novembre": "octobre", "décembre": "novembre"
            }
            if donnees.mois in mois_map:
                mois_precedent = await db.tableaux_bord.find_one({
                    "mois": mois_map[donnees.mois],
                    "annee": donnees.annee
                })
        
        precedentes_donnees = None
        if mois_precedent:
            precedentes_donnees = TableauBordMensuel(**mois_precedent)
        
        recommandations = calculer_recommandations(donnees, precedentes_donnees)
        
        # Sauvegarder les recommandations
        for reco in recommandations:
            reco["id"] = generate_id()
            reco["date_creation"] = datetime.utcnow()
            await db.recommandations.insert_one(reco)
        
        return {
            "success": True,
            "id": donnees.id,
            "recommandations": recommandations
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tableau-bord")
async def lister_tableaux_bord():
    try:
        tableaux = await db.tableaux_bord.find({}).sort("annee", -1).sort("mois", -1).to_list(length=100)
        # Clean MongoDB ObjectIds
        cleaned_tableaux = [clean_mongo_doc(tableau) for tableau in tableaux]
        return {"tableaux": cleaned_tableaux}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tableau-bord/{tableau_id}")
async def obtenir_tableau_bord(tableau_id: str):
    try:
        tableau = await db.tableaux_bord.find_one({"id": tableau_id})
        if not tableau:
            raise HTTPException(status_code=404, detail="Tableau de bord non trouvé")
        return clean_mongo_doc(tableau)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/tableau-bord/{tableau_id}")
async def modifier_tableau_bord(tableau_id: str, donnees: TableauBordMensuel):
    try:
        donnees.date_modification = datetime.utcnow()
        donnees_dict = donnees.dict()
        
        result = await db.tableaux_bord.update_one(
            {"id": tableau_id},
            {"$set": donnees_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Tableau de bord non trouvé")
            
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/tableau-bord/{tableau_id}")
async def supprimer_tableau_bord(tableau_id: str):
    try:
        result = await db.tableaux_bord.delete_one({"id": tableau_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Tableau de bord non trouvé")
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recommandations")
async def obtenir_recommandations():
    try:
        # Obtenir les recommandations récentes (derniers 30 jours)
        date_limite = datetime.utcnow().replace(day=1)  # Premier jour du mois courant
        recommandations = await db.recommandations.find({
            "date_creation": {"$gte": date_limite}
        }).sort("priorite", 1).to_list(length=50)
        
        # Clean MongoDB ObjectIds
        cleaned_recommandations = [clean_mongo_doc(reco) for reco in recommandations]
        return {"recommandations": cleaned_recommandations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/statistiques")
async def obtenir_statistiques():
    try:
        # Statistiques globales
        total_tableaux = await db.tableaux_bord.count_documents({})
        
        # Moyennes sur les 6 derniers mois
        pipeline = [
            {"$sort": {"annee": -1, "mois": -1}},
            {"$limit": 6},
            {"$group": {
                "_id": None,
                "moyenne_recettes_totales": {
                    "$avg": {
                        "$add": [
                            "$recettes.especes",
                            "$recettes.cheques", 
                            "$recettes.cartes_bancaires",
                            "$recettes.virements",
                            "$recettes.prelevements"
                        ]
                    }
                },
                "moyenne_consultations": {"$avg": "$activite.premieres_consultations"},
                "moyenne_abandons": {"$avg": "$activite.abandons_departs"},
                "total_dossiers_actifs": {"$avg": {
                    "$add": [
                        "$dossiers_actifs.phase_1",
                        "$dossiers_actifs.phase_2",
                        "$dossiers_actifs.phase_3"
                    ]
                }}
            }}
        ]
        
        stats = await db.tableaux_bord.aggregate(pipeline).to_list(length=1)
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