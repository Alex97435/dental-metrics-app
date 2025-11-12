#!/bin/bash

# Script de démarrage pour OrthoManager
# Application Full-Stack : FastAPI Backend + React Frontend

set -e

echo "🚀 Démarrage d'OrthoManager..."

# Installation des dépendances backend
echo "📦 Installation des dépendances Python..."
cd backend
pip install -r requirements.txt
cd ..

# Installation des dépendances frontend
echo "📦 Installation des dépendances Node.js..."
cd frontend
yarn install
echo "🏗️ Build du frontend React..."
yarn build
cd ..

# Démarrage des services
echo "🔧 Configuration des variables d'environnement..."

# Variables d'environnement par défaut pour la production
export MONGO_URL=${MONGO_URL:-"mongodb://localhost:27017/orthodontie_db"}
export PORT=${PORT:-8001}
export FRONTEND_PORT=${FRONTEND_PORT:-3000}

echo "🎯 Démarrage du backend FastAPI..."
cd backend
# Démarrage du backend en arrière-plan
uvicorn server:app --host 0.0.0.0 --port $PORT &
BACKEND_PID=$!

echo "🌐 Démarrage du serveur de fichiers statiques frontend..."
cd ../frontend
# Servir les fichiers build avec un serveur HTTP simple
python3 -m http.server $FRONTEND_PORT --directory build &
FRONTEND_PID=$!

echo "✅ OrthoManager démarré !"
echo "📊 Backend API: http://0.0.0.0:$PORT"
echo "🖥️ Frontend: http://0.0.0.0:$FRONTEND_PORT"
echo "💡 Application complète accessible sur le port $FRONTEND_PORT"

# Fonction de nettoyage
cleanup() {
    echo "🛑 Arrêt des services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Écouter les signaux d'arrêt
trap cleanup SIGTERM SIGINT

# Attendre les processus
wait $BACKEND_PID $FRONTEND_PID