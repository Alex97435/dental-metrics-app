#!/bin/bash

# Script spécifique pour Railway
# Alternative qui utilise gunicorn pour le backend

set -e

echo "🚀 Démarrage d'OrthoManager sur Railway..."

# Variables d'environnement
export PYTHONPATH=/app/backend
export PORT=${PORT:-8001}
export FRONTEND_PORT=${FRONTEND_PORT:-3000}

# Vérifier que le build frontend existe
if [ ! -d "frontend/build" ]; then
    echo "📦 Build du frontend React..."
    cd frontend
    yarn build
    cd ..
fi

echo "🌐 Démarrage du serveur avec gunicorn..."

# Changer vers le répertoire backend
cd backend

# Démarrer avec gunicorn (plus adapté pour la production)
exec gunicorn server:app \
    --bind 0.0.0.0:$PORT \
    --workers 1 \
    --worker-class uvicorn.workers.UvicornWorker \
    --timeout 120 \
    --keep-alive 2 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --preload