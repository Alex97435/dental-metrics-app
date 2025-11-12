#!/bin/bash

# Script de validation pour le build alternatif

set -e

echo "🔍 Validation Build Alternatif OrthoManager..."

# Test 1: Dockerfile structure
echo "📋 Test 1: Structure Dockerfile"
if grep -q "FROM node:18-alpine as frontend-builder" Dockerfile; then
    echo "✅ Multi-stage build configuré"
else
    echo "❌ Multi-stage build manquant"
    exit 1
fi

if grep -q "FROM python:3.11-slim" Dockerfile; then
    echo "✅ Base Python configurée"
else
    echo "❌ Base Python manquante"
    exit 1
fi

# Test 2: Backend functionality
echo "📋 Test 2: Backend API"
cd backend
python -c "
from server import app
routes = [r for r in app.routes if hasattr(r, 'path')]
print(f'✅ {len(routes)} routes API disponibles')
assert len(routes) > 10, 'Pas assez de routes'
print('✅ Backend FastAPI fonctionnel')
"

# Test 3: Scripts exécutables
echo "📋 Test 3: Scripts de démarrage"
cd ..
for script in start.sh start-prod.sh railway.sh; do
    if [ -x "$script" ]; then
        echo "✅ $script exécutable"
    else
        echo "❌ $script non exécutable"
        exit 1
    fi
done

# Test 4: Configuration Railway
echo "📋 Test 4: Configuration Railway"
if [ -f "Procfile" ] && [ -f "railway.json" ]; then
    echo "✅ Configuration Railway présente"
else
    echo "❌ Configuration Railway manquante"
    exit 1
fi

# Test 5: Dépendances Python
echo "📋 Test 5: Dépendances Python"
cd backend
if pip list | grep -E "fastapi|uvicorn|gunicorn" > /dev/null; then
    echo "✅ Dépendances Python installées"
else
    echo "❌ Dépendances Python manquantes"
    exit 1
fi

echo ""
echo "🎉 Validation réussie !"
echo "🚀 Le build Railway devrait maintenant fonctionner"
echo ""
echo "📦 Architecture:"
echo "  - Frontend: React build statique (multi-stage)"
echo "  - Backend: FastAPI + Gunicorn"  
echo "  - Données: 8 mois complets (mars-octobre 2025)"
echo "  - Health: /api/health endpoint"
echo ""
echo "🌐 URLs de production:"
echo "  - App: https://your-app.railway.app/"
echo "  - API: https://your-app.railway.app/api/"
echo "  - Docs: https://your-app.railway.app/docs"