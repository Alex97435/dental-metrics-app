import React, { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { Calendar, TrendingUp, TrendingDown, Users, Euro, FileText, AlertTriangle, CheckCircle, Info, Activity, Clock, Target, UserCheck, BarChart3, PieChart, LineChart, Zap, Edit, Save, X } from 'lucide-react';

function App() {
  // Données historiques complètes (Janvier à Mai 2025)
  const donneesHistoriques = [
    {
      mois: 'janvier',
      annee: 2025,
      recettes_mois: 166000,
      debuts_traitement: 35,
      premieres_consultations: 42,
      taux_transformation_enfants: 75,
      rdv_manques: 120,
      rdv_presents: 850
    },
    {
      mois: 'février', 
      annee: 2025,
      recettes_mois: 179000,
      debuts_traitement: 38,
      premieres_consultations: 45,
      taux_transformation_enfants: 72,
      rdv_manques: 115,
      rdv_presents: 880
    },
    {
      mois: 'mars',
      annee: 2025,
      recettes_mois: 154000,
      debuts_traitement: 33,
      premieres_consultations: 39,
      taux_transformation_enfants: 76,
      rdv_manques: 125,
      rdv_presents: 820
    },
    {
      mois: 'avril',
      annee: 2025,
      recettes_mois: 172000,
      debuts_traitement: 40,
      premieres_consultations: 41,
      taux_transformation_enfants: 78,
      rdv_manques: 118,
      rdv_presents: 895
    },
    {
      mois: 'mai',
      annee: 2025,
      recettes_mois: 167000,
      debuts_traitement: 41,
      premieres_consultations: 37,
      taux_transformation_enfants: 79,
      rdv_manques: 131,
      rdv_presents: 900
    }
  ];

  const [currentData, setCurrentData] = useState({
    mois: 'mai',
    annee: 2025,
    metriques_activite: {
      debuts_traitement: 41,
      premieres_consultations: 37,
      deposes: 22,
      recettes_mois: 167000,
      rdv_manques: 131,
      rdv_presents: 900
    },
    ressources_humaines: {
      jours_collaborateur: 19,
      jours_dr_vergez: 13
    },
    consultations_cse: {
      nombre_cse: 20,
      en_traitement_attente_cse: 3,
      taux_transformation_cse: 15.0
    },
    diagnostics_enfants: {
      nombre_diagnostics_enfants: 19,
      en_traitement_attente_enfants: 15,
      taux_transformation_enfants: 79.0
    },
    consultations_csa: {
      nombre_csa: 17,
      en_traitement_attente_csa: 0,
      taux_transformation_csa: 0.0
    },
    devis: {
      total_devis_acceptes: 120000,
      nombre_devis_acceptes: 23
    },
    comparaisons: {
      debuts_traitement_evolution: 37.0,
      consultations_evolution: -3.0,
      deposes_evolution: -12.0,
      recettes_evolution: 1.0,
      rdv_manques_evolution: 9.0,
      rdv_presents_evolution: 12.0,
      jours_collaborateur_evolution: 6.0,
      jours_vergez_evolution: 30.0,
      cse_evolution: 33.0,
      diagnostics_enfants_evolution: -5.0,
      csa_evolution: -26.0,
      devis_evolution: -26.0
    }
  });

  const [tableaux, setTableaux] = useState([]);
  const [recommandations, setRecommandations] = useState([]);
  const [rectifications, setRectifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    chargerTableaux();
    chargerRecommandations();
    chargerRectifications();
  }, []);

  const chargerTableaux = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/tableau-bord-vergez`);
      const data = await response.json();
      setTableaux(data.tableaux || []);
    } catch (error) {
      console.error('Erreur chargement tableaux:', error);
    }
  };

  const chargerRecommandations = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/recommandations-vergez`);
      const data = await response.json();
      setRecommandations(data.recommandations || []);
    } catch (error) {
      console.error('Erreur chargement recommandations:', error);
    }
  };

  const chargerRectifications = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/rectifications-recettes`);
      const data = await response.json();
      setRectifications(data.rectifications || []);
    } catch (error) {
      console.error('Erreur chargement rectifications:', error);
    }
  };

  const sauvegarderDonnees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/tableau-bord-vergez`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });
      
      const result = await response.json();
      if (result.success) {
        const action = result.action === 'updated' ? 'modifiées' : 'créées';
        setMessage(`Données ${action} avec succès !`);
        await chargerTableaux();
        await chargerRecommandations();
        setActiveTab('dashboard');
      }
    } catch (error) {
      setMessage('Erreur lors de la sauvegarde: ' + error.message);
    }
    setLoading(false);
  };

  const startEdit = (tableau) => {
    setEditingId(tableau.id);
    setEditData({
      debuts_traitement: tableau.metriques_activite.debuts_traitement,
      premieres_consultations: tableau.metriques_activite.premieres_consultations,
      recettes_mois: tableau.metriques_activite.recettes_mois,
      taux_transformation_enfants: tableau.diagnostics_enfants.taux_transformation_enfants
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async (tableauId) => {
    setLoading(true);
    try {
      // Récupérer le tableau complet
      const tableau = tableaux.find(t => t.id === tableauId);
      if (!tableau) return;

      // Mettre à jour les données modifiées
      const updatedData = {
        ...tableau,
        metriques_activite: {
          ...tableau.metriques_activite,
          debuts_traitement: parseInt(editData.debuts_traitement) || 0,
          premieres_consultations: parseInt(editData.premieres_consultations) || 0,
          recettes_mois: parseFloat(editData.recettes_mois) || 0
        },
        diagnostics_enfants: {
          ...tableau.diagnostics_enfants,
          taux_transformation_enfants: parseFloat(editData.taux_transformation_enfants) || 0
        }
      };

      const response = await fetch(`${backendUrl}/api/tableau-bord-vergez/${tableauId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();
      if (result.success) {
        setMessage('Données modifiées avec succès !');
        await chargerTableaux();
        setEditingId(null);
        setEditData({});
      }
    } catch (error) {
      setMessage('Erreur lors de la modification: ' + error.message);
    }
    setLoading(false);
  };

  const updateNestedData = (section, field, value) => {
    setCurrentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
      }
    }));
  };

  const getEvolutionIcon = (evolution) => {
    if (evolution > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (evolution < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const getEvolutionColor = (evolution) => {
    if (evolution > 0) return 'text-green-600 bg-green-50';
    if (evolution < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getRecommandationIcon = (type) => {
    switch (type) {
      case 'alerte': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'suggestion': return <Info className="w-4 h-4 text-blue-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getRecommandationColor = (type) => {
    switch (type) {
      case 'alerte': return 'border-red-200 bg-red-50';
      case 'suggestion': return 'border-blue-200 bg-blue-50';
      case 'info': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const calculerTauxRdvManques = () => {
    const total = currentData.metriques_activite.rdv_manques + currentData.metriques_activite.rdv_presents;
    return total > 0 ? (currentData.metriques_activite.rdv_manques / total * 100).toFixed(1) : 0;
  };

  const calculerMoyenneRecettes = () => {
    const total = donneesHistoriques.reduce((sum, mois) => sum + mois.recettes_mois, 0);
    return Math.round(total / donneesHistoriques.length);
  };

  const calculerCroissanceRecettes = () => {
    if (donneesHistoriques.length < 2) return 0;
    const dernierMois = donneesHistoriques[donneesHistoriques.length - 1];
    const premierMois = donneesHistoriques[0];
    return (((dernierMois.recettes_mois - premierMois.recettes_mois) / premierMois.recettes_mois) * 100).toFixed(1);
  };

  // Composant graphique simple pour les données historiques
  const SimpleChart = ({ data, dataKey, title, color = "#3b82f6" }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    const minValue = Math.min(...data.map(d => d[dataKey]));
    
    return (
      <div className="chart-container">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
        <div className="flex items-end justify-between h-20 gap-2">
          {data.map((item, index) => {
            const height = ((item[dataKey] - minValue) / (maxValue - minValue)) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs font-medium mb-1" style={{color}}>
                  {typeof item[dataKey] === 'number' && dataKey === 'recettes_mois' 
                    ? `${Math.round(item[dataKey] / 1000)}K` 
                    : item[dataKey]
                  }
                </div>
                <div 
                  className="w-full rounded-t transition-all duration-500"
                  style={{
                    height: `${Math.max(height, 5)}%`,
                    backgroundColor: color,
                    opacity: 0.8
                  }}
                />
                <div className="text-xs text-gray-500 mt-1 capitalize">
                  {item.mois.slice(0, 3)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header moderne style PowerBI */}
      <div 
        className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=1920&h=400&fit=crop&crop=center')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/85 to-purple-900/90"></div>
        <div className="relative container mx-auto p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                SELARL Dr VERGEZ
              </h1>
              <p className="text-blue-100 text-lg">Tableau de bord orthodontique • Analytics & Performance</p>
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  <span className="text-sm">Moyenne mensuelle: {calculerMoyenneRecettes().toLocaleString('fr-FR')}€</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-sm">Croissance: +{calculerCroissanceRecettes()}%</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className="text-lg px-6 py-3 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                <Calendar className="w-5 h-5 mr-2" />
                {currentData.mois} {currentData.annee}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              <LineChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="saisie" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              <FileText className="w-4 h-4 mr-2" />
              Saisie
            </TabsTrigger>
            <TabsTrigger value="recommandations" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              <Zap className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="historique" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              <Clock className="w-4 h-4 mr-2" />
              Historique
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* KPIs principaux style PowerBI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="powerbi-card bg-gradient-to-br from-blue-500 to-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <Euro className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-sm">Recettes du mois</div>
                    <div className="text-3xl font-bold text-white">
                      {Math.round(currentData.metriques_activite.recettes_mois / 1000)}K€
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center px-3 py-1 rounded-full ${getEvolutionColor(currentData.comparaisons.recettes_evolution)} bg-white/20`}>
                    {getEvolutionIcon(currentData.comparaisons.recettes_evolution)}
                    <span className="ml-1 text-white text-sm">
                      {currentData.comparaisons.recettes_evolution > 0 ? '+' : ''}{currentData.comparaisons.recettes_evolution}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="powerbi-card bg-gradient-to-br from-green-500 to-green-600">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-sm">Débuts traitement</div>
                    <div className="text-3xl font-bold text-white">
                      {currentData.metriques_activite.debuts_traitement}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center px-3 py-1 rounded-full bg-white/20`}>
                    {getEvolutionIcon(currentData.comparaisons.debuts_traitement_evolution)}
                    <span className="ml-1 text-white text-sm">
                      +{currentData.comparaisons.debuts_traitement_evolution}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="powerbi-card bg-gradient-to-br from-purple-500 to-purple-600">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-sm">Consultations</div>
                    <div className="text-3xl font-bold text-white">
                      {currentData.metriques_activite.premieres_consultations}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center px-3 py-1 rounded-full bg-white/20">
                    {getEvolutionIcon(currentData.comparaisons.consultations_evolution)}
                    <span className="ml-1 text-white text-sm">
                      {currentData.comparaisons.consultations_evolution}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="powerbi-card bg-gradient-to-br from-orange-500 to-orange-600">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-sm">Transf. Enfants</div>
                    <div className="text-3xl font-bold text-white">
                      {currentData.diagnostics_enfants.taux_transformation_enfants}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center px-3 py-1 rounded-full bg-white/20">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span className="ml-1 text-white text-sm">Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections détaillées style PowerBI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {/* CSE Performance */}
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">Performance CSE</h3>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${currentData.consultations_cse.taux_transformation_cse < 20 ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Consultations CSE</span>
                    <span className="font-bold text-white text-xl">{currentData.consultations_cse.nombre_cse}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">En traitement</span>
                    <span className="font-bold text-white">{currentData.consultations_cse.en_traitement_attente_cse}</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300">Taux transformation</span>
                      <span className={`font-bold ${currentData.consultations_cse.taux_transformation_cse < 20 ? 'text-red-400' : 'text-green-400'}`}>
                        {currentData.consultations_cse.taux_transformation_cse}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-700 ${currentData.consultations_cse.taux_transformation_cse < 20 ? 'bg-red-400' : 'bg-green-400'}`}
                        style={{ width: `${currentData.consultations_cse.taux_transformation_cse}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostics Enfants */}
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">Pédodontie</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Diagnostics</span>
                    <span className="font-bold text-white text-xl">{currentData.diagnostics_enfants.nombre_diagnostics_enfants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">En traitement</span>
                    <span className="font-bold text-white">{currentData.diagnostics_enfants.en_traitement_attente_enfants}</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300">Taux transformation</span>
                      <span className="font-bold text-green-400">{currentData.diagnostics_enfants.taux_transformation_enfants}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className="bg-green-400 h-3 rounded-full transition-all duration-700"
                        style={{ width: `${currentData.diagnostics_enfants.taux_transformation_enfants}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ressources & Devis */}
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">Ressources & Devis</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Dr Vergez</span>
                    <span className="font-bold text-white">{currentData.ressources_humaines.jours_dr_vergez} jours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Collaborateur</span>
                    <span className="font-bold text-white">{currentData.ressources_humaines.jours_collaborateur} jours</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-600 pt-3">
                    <span className="text-slate-300">Devis acceptés</span>
                    <span className="font-bold text-white">{currentData.devis.nombre_devis_acceptes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total devis</span>
                    <span className="font-bold text-blue-400">{Math.round(currentData.devis.total_devis_acceptes / 1000)}K€</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Graphiques des tendances */}
              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriques} 
                  dataKey="recettes_mois" 
                  title="Évolution des Recettes (Jan-Mai 2025)"
                  color="#3b82f6"
                />
              </div>

              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriques} 
                  dataKey="debuts_traitement" 
                  title="Débuts de Traitement par Mois"
                  color="#10b981"
                />
              </div>

              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriques} 
                  dataKey="premieres_consultations" 
                  title="Premières Consultations"
                  color="#8b5cf6"
                />
              </div>

              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriques} 
                  dataKey="taux_transformation_enfants" 
                  title="Taux Transformation Enfants (%)"
                  color="#f59e0b"
                />
              </div>
            </div>

            {/* Tableau de performance mensuelle */}
            <div className="powerbi-section">
              <div className="powerbi-section-header">
                <h3 className="text-xl font-bold text-white">Performance Mensuelle 2025</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 px-4 font-semibold text-slate-300">Mois</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-300">Recettes</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-300">Débuts</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-300">Consultations</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-300">Transf. Enfants</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-300">RDV Manqués</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donneesHistoriques.map((mois, index) => (
                      <tr key={index} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-medium text-white capitalize">{mois.mois}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-blue-400">{mois.recettes_mois.toLocaleString('fr-FR')}€</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-green-400">{mois.debuts_traitement}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-purple-400">{mois.premieres_consultations}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-orange-400">{mois.taux_transformation_enfants}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-red-400">{mois.rdv_manques}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saisie">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations générales */}
              <Card className="powerbi-section">
                <h3 className="text-xl font-bold mb-4 text-white">Informations Générales</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mois" className="text-slate-300">Mois</Label>
                    <Input
                      id="mois"
                      value={currentData.mois}
                      onChange={(e) => setCurrentData(prev => ({ ...prev, mois: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="annee" className="text-slate-300">Année</Label>
                    <Input
                      id="annee"
                      type="number"
                      value={currentData.annee}
                      onChange={(e) => setCurrentData(prev => ({ ...prev, annee: parseInt(e.target.value) || 2025 }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </Card>

              {/* Métriques d'activité */}
              <Card className="powerbi-section">
                <h3 className="text-xl font-bold mb-4 text-white">Métriques d'Activité</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="debuts_traitement" className="text-slate-300">Débuts de traitement</Label>
                    <Input
                      id="debuts_traitement"
                      type="number"
                      value={currentData.metriques_activite.debuts_traitement}
                      onChange={(e) => updateNestedData('metriques_activite', 'debuts_traitement', parseInt(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="premieres_consultations" className="text-slate-300">Premières consultations</Label>
                    <Input
                      id="premieres_consultations"
                      type="number"
                      value={currentData.metriques_activite.premieres_consultations}
                      onChange={(e) => updateNestedData('metriques_activite', 'premieres_consultations', parseInt(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recettes_mois" className="text-slate-300">Recettes du mois (€)</Label>
                    <Input
                      id="recettes_mois"
                      type="number"
                      step="0.01"
                      value={currentData.metriques_activite.recettes_mois}
                      onChange={(e) => updateNestedData('metriques_activite', 'recettes_mois', parseFloat(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </Card>

              {/* Consultations CSE */}
              <Card className="powerbi-section">
                <h3 className="text-xl font-bold mb-4 text-white">Consultations CSE</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nombre_cse" className="text-slate-300">Nombre CSE</Label>
                    <Input
                      id="nombre_cse"
                      type="number"
                      value={currentData.consultations_cse.nombre_cse}
                      onChange={(e) => updateNestedData('consultations_cse', 'nombre_cse', parseInt(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taux_transformation_cse" className="text-slate-300">Taux transformation CSE (%)</Label>
                    <Input
                      id="taux_transformation_cse"
                      type="number"
                      step="0.1"
                      value={currentData.consultations_cse.taux_transformation_cse}
                      onChange={(e) => updateNestedData('consultations_cse', 'taux_transformation_cse', parseFloat(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </Card>

              {/* Diagnostics Enfants */}
              <Card className="powerbi-section">
                <h3 className="text-xl font-bold mb-4 text-white">Diagnostics Enfants</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nombre_diagnostics_enfants" className="text-slate-300">Nombre diagnostics enfants</Label>
                    <Input
                      id="nombre_diagnostics_enfants"
                      type="number"
                      value={currentData.diagnostics_enfants.nombre_diagnostics_enfants}
                      onChange={(e) => updateNestedData('diagnostics_enfants', 'nombre_diagnostics_enfants', parseInt(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taux_transformation_enfants" className="text-slate-300">Taux transformation enfants (%)</Label>
                    <Input
                      id="taux_transformation_enfants"
                      type="number"
                      step="0.1"
                      value={currentData.diagnostics_enfants.taux_transformation_enfants}
                      onChange={(e) => updateNestedData('diagnostics_enfants', 'taux_transformation_enfants', parseFloat(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={sauvegarderDonnees}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {loading ? 'Sauvegarde en cours...' : 'Sauvegarder les données'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="recommandations">
            <div className="space-y-6">
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-xl font-bold text-white">Intelligence Business • Recommandations</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Analyse prédictive des performances avec suggestions personnalisées
                </p>
                
                {recommandations.length === 0 ? (
                  <div className="text-center py-12">
                    <Zap className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">Aucune recommandation disponible</p>
                    <p className="text-sm text-slate-500">Saisissez des données pour déclencher l'analyse IA</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommandations.map((reco, index) => (
                      <div
                        key={reco.id || index}
                        className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${getRecommandationColor(reco.type)} bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm`}
                      >
                        <div className="flex items-start space-x-4">
                          {getRecommandationIcon(reco.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-blue-600 text-lg">{reco.titre}</h4>
                              <Badge variant="outline" className="text-xs bg-white/20 text-blue-600 border-blue-300">
                                {reco.categorie}
                              </Badge>
                            </div>
                            <p className="text-blue-600 leading-relaxed">
                              {reco.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="historique">
            <div className="powerbi-section">
              <div className="powerbi-section-header">
                <h3 className="text-xl font-bold text-white">Historique des Données • Archive</h3>
              </div>
              
              {tableaux.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Aucun tableau de bord sauvegardé</p>
                  <p className="text-sm text-slate-500">Les données saisies apparaîtront ici</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Période</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Recettes</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Débuts traitement</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Consultations</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Taux transfo. enfants</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Date création</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableaux.map((tableau, index) => (
                        <tr key={tableau.id || index} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-medium text-white capitalize">{tableau.mois} {tableau.annee}</span>
                          </td>
                          <td className="py-4 px-4">
                            {editingId === tableau.id ? (
                              <Input
                                type="number"
                                value={editData.recettes_mois}
                                onChange={(e) => setEditData({...editData, recettes_mois: e.target.value})}
                                className="bg-slate-700 border-slate-600 text-white w-32"
                              />
                            ) : (
                              <span className="font-bold text-blue-400">{tableau.metriques_activite.recettes_mois.toLocaleString('fr-FR')}€</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            {editingId === tableau.id ? (
                              <Input
                                type="number"
                                value={editData.debuts_traitement}
                                onChange={(e) => setEditData({...editData, debuts_traitement: e.target.value})}
                                className="bg-slate-700 border-slate-600 text-white w-20"
                              />
                            ) : (
                              <span className="font-bold text-green-400">{tableau.metriques_activite.debuts_traitement}</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            {editingId === tableau.id ? (
                              <Input
                                type="number"
                                value={editData.premieres_consultations}
                                onChange={(e) => setEditData({...editData, premieres_consultations: e.target.value})}
                                className="bg-slate-700 border-slate-600 text-white w-20"
                              />
                            ) : (
                              <span className="font-bold text-purple-400">{tableau.metriques_activite.premieres_consultations}</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            {editingId === tableau.id ? (
                              <Input
                                type="number"
                                step="0.1"
                                value={editData.taux_transformation_enfants}
                                onChange={(e) => setEditData({...editData, taux_transformation_enfants: e.target.value})}
                                className="bg-slate-700 border-slate-600 text-white w-20"
                              />
                            ) : (
                              <span className="font-bold text-orange-400">{tableau.diagnostics_enfants.taux_transformation_enfants}%</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-400">
                            {new Date(tableau.date_creation).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              {editingId === tableau.id ? (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => saveEdit(tableau.id)}
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Save className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelEdit}
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => startEdit(tableau)}
                                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;