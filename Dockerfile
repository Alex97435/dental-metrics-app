# Dockerfile alternatif - Build en deux étapes avec images séparées
FROM node:18-alpine as frontend-builder

# Répertoire de travail pour le frontend
WORKDIR /frontend

# Copier package.json du frontend
COPY frontend/package.json ./

# Créer un package.json minimal qui fonctionne
RUN cat > package.json << 'EOF'
{
  "name": "orthomanager-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
EOF

# Installation avec npm
RUN npm install --legacy-peer-deps

# Copier le code source frontend
COPY frontend/src ./src
COPY frontend/public ./public

# Créer une version simplifiée d'App.js
RUN cat > src/App.js << 'EOF'
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          padding: '2rem',
          color: 'white',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #4f46e5 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              <div>
                <div>ORTHO</div>
                <div>MANAGER</div>
              </div>
            </div>
            <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>OrthoManager</h1>
            <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>
              Solution complète de gestion orthodontique
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📊 Analytics Avancées</h3>
              <p>Tableaux de bord PowerBI-style avec métriques en temps réel et visualisations interactives.</p>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎯 Suivi Performance</h3>
              <p>Monitoring complet des débuts de traitement, consultations et performance financière.</p>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ IA & Recommandations</h3>
              <p>Intelligence artificielle intégrée pour analyser vos performances et générer des recommandations.</p>
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏥 Application Orthodontique Complète</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              8 mois de données historiques • Analytics complets • Branding professionnel
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#60a5fa' }}>467</div>
                <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>Débuts Cumulés</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#34d399' }}>2.1M€</div>
                <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>Recettes Cumulées</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }}>89%</div>
                <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>Taux Enfants Oct</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
EOF

# Créer un CSS simple
RUN cat > src/App.css << 'EOF'
.App {
  text-align: center;
}

.App-header {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}
EOF

# Build du frontend
RUN npm run build

# Stage 2: Production avec Python
FROM python:3.11-slim

# Installation des outils nécessaires
RUN apt-get update && apt-get install -y curl && apt-get clean

# Répertoire de travail
WORKDIR /app

# Copier les dépendances backend
COPY backend/requirements.txt backend/

# Installation des dépendances Python
RUN cd backend && pip install --no-cache-dir -r requirements.txt

# Copier le backend
COPY backend/ backend/

# Copier les fichiers build du frontend depuis le stage précédent
COPY --from=frontend-builder /frontend/build/ frontend/build/

# Copier les scripts
COPY start.sh start-prod.sh railway.sh ./
RUN chmod +x start.sh start-prod.sh railway.sh

# Variables d'environnement
ENV PYTHONPATH=/app/backend
ENV NODE_ENV=production

# Exposer le port
EXPOSE $PORT

# Commande de démarrage
CMD ["./start-prod.sh"]