# Dockerfile pour OrthoManager
FROM python:3.11-slim

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Répertoire de travail
WORKDIR /app

# Copier les fichiers requirements en premier (pour le cache Docker)
COPY backend/requirements.txt ./backend/
COPY frontend/package.json ./frontend/

# Installer les dépendances Python
RUN cd backend && pip install --no-cache-dir -r requirements.txt

# Installer les dépendances Node.js
RUN cd frontend && yarn install --frozen-lockfile

# Copier le reste des fichiers
COPY . .

# Construire le frontend
RUN cd frontend && yarn build

# Rendre les scripts executables
RUN chmod +x start.sh start-prod.sh railway.sh

# Créer un utilisateur non-root pour la sécurité
RUN useradd -m -u 1000 orthomanager && chown -R orthomanager:orthomanager /app
USER orthomanager

# Exposer les ports
EXPOSE 3000 8001

# Variables d'environnement
ENV PYTHONPATH=/app/backend
ENV NODE_ENV=production

# Commande de démarrage
CMD ["./start-prod.sh"]