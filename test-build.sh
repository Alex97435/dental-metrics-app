#!/bin/bash

# Script de test du build pour OrthoManager

set -e

echo "🔍 Test du build OrthoManager..."

# Test 1: Backend
echo "📋 Test 1: Backend Python"
cd /app/backend
python -c "
from server import app
print('✅ Backend FastAPI importé avec succès')
"

# Test 2: Frontend build
echo "📋 Test 2: Frontend build"
cd /app/frontend
if [ -d "build" ]; then
    echo "✅ Dossier build existe"
    if [ -f "build/index.html" ]; then
        echo "✅ index.html généré"
    else
        echo "❌ index.html manquant"
        exit 1
    fi
else
    echo "❌ Dossier build manquant"
    exit 1
fi

# Test 3: Scripts exécutables
echo "📋 Test 3: Scripts exécutables"
cd /app
for script in start.sh start-prod.sh railway.sh; do
    if [ -x "$script" ]; then
        echo "✅ $script est exécutable"
    else
        echo "❌ $script n'est pas exécutable"
        exit 1
    fi
done

# Test 4: Dépendances clés
echo "📋 Test 4: Dépendances"
cd /app/backend
pip list | grep -E "fastapi|uvicorn|gunicorn" > /dev/null && echo "✅ Dépendances Python OK"

cd /app/frontend
ls node_modules/@radix-ui > /dev/null 2>&1 && echo "✅ Dépendances Node.js OK"

echo ""
echo "🎉 Tous les tests sont passés !"
echo "🚀 L'application est prête pour le déploiement"