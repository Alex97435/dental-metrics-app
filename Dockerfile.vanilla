# Dockerfile Vanilla - Pas de React, HTML/CSS/JS pur
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

# Créer le frontend HTML/CSS/JS vanilla
RUN mkdir -p frontend/build/static/css frontend/build/static/js

# Créer index.html principal
RUN cat > frontend/build/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="OrthoManager - Solution complète de gestion orthodontique" />
    <title>OrthoManager - Gestion Orthodontique</title>
    <link rel="stylesheet" href="/static/css/main.css" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .logo {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #4f46e5 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
            transition: transform 0.3s ease;
        }
        
        .logo:hover {
            transform: translateY(-4px) scale(1.05);
        }
        
        .logo-text {
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            line-height: 1.2;
        }
        
        .title {
            font-size: 4rem;
            font-weight: bold;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .subtitle {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 2rem;
            transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-8px);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .feature-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        
        .stats {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 3rem;
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .footer {
            text-align: center;
            padding: 2rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 16px;
        }
        
        .api-links {
            margin: 2rem 0;
            text-align: center;
        }
        
        .api-link {
            display: inline-block;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            margin: 0 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .api-link:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .title {
                font-size: 2.5rem;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo">
                <div class="logo-text">
                    <div>ORTHO</div>
                    <div>MANAGER</div>
                </div>
            </div>
            <h1 class="title">OrthoManager</h1>
            <p class="subtitle">Solution complète de gestion orthodontique</p>
            <p>Développé à l'île de la Réunion pour les orthodontistes français</p>
        </header>

        <section class="features">
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3 class="feature-title">Analytics Avancées</h3>
                <p>Tableaux de bord PowerBI-style avec métriques en temps réel, comparaisons N-1, et visualisations interactives pour un pilotage optimal de votre activité orthodontique.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3 class="feature-title">Suivi Performance</h3>
                <p>Monitoring complet des débuts de traitement, consultations, taux de transformation, et performance financière avec alertes automatiques.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3 class="feature-title">IA & Recommandations</h3>
                <p>Intelligence artificielle intégrée pour analyser vos performances et générer des recommandations personnalisées d'amélioration.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🕒</div>
                <h3 class="feature-title">Gestion Temps Réel</h3>
                <p>Saisie simplifiée des données, historiques complets, et mise à jour automatique de tous vos indicateurs de performance.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <h3 class="feature-title">Sécurité & Fiabilité</h3>
                <p>Données sécurisées, sauvegardes automatiques, et architecture cloud hautement disponible pour une tranquillité d'esprit totale.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">❤️</div>
                <h3 class="feature-title">Support Réunionnais</h3>
                <p>Développé et supporté depuis l'île de la Réunion, avec une compréhension unique des besoins des orthodontistes français.</p>
            </div>
        </section>

        <section class="stats">
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Données Orthodontiques Complètes</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">8 mois d'historique • Mars à Octobre 2025</p>
            
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number" style="color: #60a5fa;">467</div>
                    <div class="stat-label">Débuts Cumulés</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" style="color: #34d399;">2.1M€</div>
                    <div class="stat-label">Recettes Cumulées</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" style="color: #fbbf24;">89%</div>
                    <div class="stat-label">Taux Enfants Oct</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" style="color: #f87171;">25.8%</div>
                    <div class="stat-label">Taux CSE Oct</div>
                </div>
            </div>
        </section>

        <section class="api-links">
            <h2 style="margin-bottom: 2rem;">Accès API Complet</h2>
            <a href="/api/health" class="api-link">🩺 Health Check</a>
            <a href="/docs" class="api-link">📚 Documentation API</a>
            <a href="/api/tableau-bord-complet" class="api-link">📊 Données Orthodontiques</a>
        </section>

        <footer class="footer">
            <h3 style="margin-bottom: 1rem;">🏥 OrthoManager</h3>
            <p>Application développée par <strong>OrthoManager</strong> entreprise basée à l'île de la Réunion</p>
            <p style="margin-top: 1rem; opacity: 0.8;">Solution française pour orthodontistes français</p>
        </footer>
    </div>

    <script>
        // Animation simple pour les cartes
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            });
            
            console.log('🏥 OrthoManager - Application orthodontique chargée');
            console.log('📊 8 mois de données disponibles (Mars-Octobre 2025)');
            console.log('🚀 API FastAPI complète sur /api/');
        });
    </script>
</body>
</html>
EOF

# Créer un fichier CSS vide (requis par l'HTML)
RUN touch frontend/build/static/css/main.css

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