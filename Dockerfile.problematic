# Dockerfile simplifié pour OrthoManager - Version NPM
FROM python:3.11-slim

# Installation de Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Répertoire de travail
WORKDIR /app

# Copier les fichiers package.json en premier pour le cache
COPY frontend/package.json frontend/
COPY backend/requirements.txt backend/

# Installation des dépendances frontend avec npm (plus stable que yarn)
RUN cd frontend && npm install --legacy-peer-deps

# Installation des dépendances backend
RUN cd backend && pip install --no-cache-dir -r requirements.txt

# Copier le reste des fichiers
COPY . .

# Build du frontend
RUN cd frontend && npm run build

# Rendre les scripts executables
RUN chmod +x start.sh start-prod.sh railway.sh

# Exposer le port
EXPOSE $PORT

# Variables d'environnement
ENV PYTHONPATH=/app/backend
ENV NODE_ENV=production

# Commande de démarrage
CMD ["./start-prod.sh"]