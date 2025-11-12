# 🚀 Options de Démarrage OrthoManager

## Scripts Disponibles

### 1. `start.sh` - Développement Full-Stack
```bash
./start.sh
```
- Démarre backend (uvicorn) + frontend (serveur statique)
- Ports: 8001 (API) + 3000 (Frontend)
- Usage: Développement local complet

### 2. `start-prod.sh` - Production Optimisé
```bash
./start-prod.sh
```
- Démarre uniquement le backend avec gunicorn
- Port: $PORT (défini par Railway)
- Usage: **Déploiement Railway/Railpack**
- Frontend servi en statique via le build

### 3. `railway.sh` - Spécifique Railway
```bash
./railway.sh
```
- Alternative pour Railway avec configuration optimisée
- Gunicorn avec worker uvicorn
- Configuration production complète

## Configuration Railway

Railway utilise automatiquement :
1. **Dockerfile** pour le build
2. **Procfile** pour le démarrage (`web: ./start-prod.sh`)
3. **Port $PORT** automatiquement assigné

## Variables d'Environnement

### Production (Railway)
```bash
PORT=8001                    # Assigné automatiquement par Railway
PYTHONPATH=/app/backend     # Path Python
NODE_ENV=production         # Mode React
MONGO_URL=mongodb://...     # Base de données
```

### Développement Local
```bash
MONGO_URL=mongodb://localhost:27017/orthodontie_db
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Commandes de Test

### Test Gunicorn Local
```bash
cd backend
gunicorn server:app --bind localhost:8001 --workers 1 --worker-class uvicorn.workers.UvicornWorker
```

### Test Health Check
```bash
curl http://localhost:8001/api/health
```

### Test API Documentation
```bash
# Ouvrir http://localhost:8001/docs
```

## Structure de Déploiement

```
Railway Container
├── Backend API (Port $PORT)
│   ├── /api/health          ← Health check
│   ├── /api/tableau-bord-*  ← Données orthodontiques  
│   └── /docs                ← API documentation
│
└── Frontend Static Files
    ├── index.html           ← React App
    ├── static/js/           ← JavaScript bundles
    └── static/css/          ← Styles
```

## Dépannage

### Erreur "gunicorn introuvable"
- Vérifier `requirements.txt` contient `gunicorn==21.2.0`
- Réinstaller: `pip install gunicorn`

### Erreur de port
- Railway assigne automatiquement `$PORT`
- Utiliser `0.0.0.0:$PORT` pour bind

### Frontend non accessible
- Vérifier que `yarn build` s'est exécuté
- Vérifier le dossier `/app/frontend/build/`

### Base de données
- Configurer `MONGO_URL` dans Railway
- Tester la connexion depuis `/api/health`