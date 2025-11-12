# 🚀 Déploiement OrthoManager

## Configuration Railpack

OrthoManager est maintenant configuré pour le déploiement avec Railpack. Voici les fichiers créés pour le déploiement :

### 📁 Fichiers de Configuration

1. **`start.sh`** - Script principal de démarrage
   - Installation des dépendances Python (backend)
   - Installation et build des dépendances Node.js (frontend)
   - Démarrage du backend FastAPI sur le port 8001
   - Serveur de fichiers statiques pour le frontend sur le port 3000

2. **`.railpack.yml`** - Configuration Railpack
   - Détection du langage: Shell
   - Ports exposés: 3000 (frontend) et 8001 (backend)
   - Health check sur `/api/health`

3. **`Procfile`** - Configuration des processus
   - Commande web: `./start.sh`

4. **`Dockerfile`** - Configuration Docker (optionnel)
   - Base Python 3.11
   - Installation Node.js et Yarn
   - Configuration complète

5. **`package.json`** - Configuration du projet
   - Métadonnées du projet
   - Scripts de build et démarrage
   - Engines: Node >=18, Python >=3.11

### 🔧 Variables d'Environnement

#### Backend (`.env.production`)
- `MONGO_URL`: Connexion MongoDB
- `ENVIRONMENT`: production
- `DEBUG`: false

#### Frontend (`.env.production`)
- `REACT_APP_BACKEND_URL`: URL du backend
- `REACT_APP_ENVIRONMENT`: production
- `GENERATE_SOURCEMAP`: false

### 🌐 Architecture de Déploiement

```
┌─────────────────────────────────────┐
│           Railpack Cloud            │
├─────────────────────────────────────┤
│  Port 3000: Frontend React (Static) │
│  Port 8001: Backend FastAPI         │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│           MongoDB Atlas             │
│        (Base de données)            │
└─────────────────────────────────────┘
```

### 📋 Checklist Pré-Déploiement

- ✅ Script `start.sh` créé et exécutable
- ✅ Configuration Railpack (`.railpack.yml`)
- ✅ Endpoint health check (`/api/health`)
- ✅ Variables d'environnement configurées
- ✅ Dépendances Python et Node.js listées
- ✅ Build frontend configuré

### 🚀 Commandes de Déploiement

```bash
# Test local du script de démarrage
./start.sh

# Déploiement avec Railpack
railpack deploy
```

### 🩺 Health Check

L'application expose un endpoint de santé :
- **URL**: `http://your-domain:8001/api/health`
- **Méthode**: GET
- **Réponse**: JSON avec status, version, timestamp

### 🔍 Dépannage

1. **Erreur "Script start.sh introuvable"**
   - Vérifier que le fichier existe : `ls -la start.sh`
   - Vérifier les permissions : `chmod +x start.sh`

2. **Erreur de build frontend**
   - Vérifier Node.js version ≥18
   - Vérifier Yarn installation : `yarn --version`

3. **Erreur backend Python**
   - Vérifier Python version ≥3.11
   - Vérifier les dépendances : `pip list`

### 📊 Monitoring

- **Frontend**: Accessible sur le port principal
- **Backend API**: Port 8001 avec documentation `/docs`
- **Health**: Endpoint automatique `/api/health`
- **Logs**: Consultables via Railpack dashboard

---

🏥 **OrthoManager** - Solution complète de gestion orthodontique
🇫🇷 Développé à l'île de la Réunion