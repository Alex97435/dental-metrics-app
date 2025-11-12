# Dockerfile simplifié pour OrthoManager
FROM python:3.11-slim

# Installation de Node.js et outils nécessaires
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Répertoire de travail
WORKDIR /app

# Copier tous les fichiers
COPY . .

# Installation des dépendances backend
RUN cd backend && pip install -r requirements.txt

# Installation des dépendances frontend et build
RUN cd frontend && yarn install && yarn build

# Rendre les scripts executables
RUN chmod +x start.sh start-prod.sh railway.sh

# Exposer le port
EXPOSE $PORT

# Variables d'environnement
ENV PYTHONPATH=/app/backend
ENV NODE_ENV=production

# Commande de démarrage
CMD ["./start-prod.sh"]