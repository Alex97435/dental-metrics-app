# Dockerfile pour OrthoManager
FROM python:3.11-slim

# Installation de Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn

# Répertoire de travail
WORKDIR /app

# Copier les fichiers
COPY . .

# Rendre le script executable
RUN chmod +x start.sh

# Exposer les ports
EXPOSE 3000 8001

# Commande de démarrage
CMD ["./start.sh"]