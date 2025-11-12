#!/bin/bash

# Script de démarrage simplifié pour production
# Optimisé pour Railway/Railpack

set -e

echo "🚀 OrthoManager - Démarrage Production"

# Variables d'environnement
export PYTHONPATH=/app/backend
export PORT=${PORT:-8001}

# Vérifier l'installation
echo "🔍 Vérification de l'environnement..."
python --version
node --version
yarn --version

# Installation si nécessaire (pour Railway)
if [ ! -f "/app/.deps_installed" ]; then
    echo "📦 Installation des dépendances..."
    
    # Backend
    cd /app/backend
    pip install -r requirements.txt
    
    # Frontend
    cd /app/frontend
    yarn install --production=false
    yarn build
    
    # Marquer comme installé
    touch /app/.deps_installed
    cd /app
fi

# Démarrage avec gunicorn
echo "🌐 Démarrage du serveur FastAPI..."
echo "📍 Port: $PORT"
echo "🏥 Health check: http://localhost:$PORT/api/health"

cd /app/backend
exec gunicorn server:app \
    --bind 0.0.0.0:$PORT \
    --workers 1 \
    --worker-class uvicorn.workers.UvicornWorker \
    --timeout 120 \
    --keep-alive 5 \
    --max-requests 1000 \
    --access-logfile - \
    --error-logfile - \
    --log-level info