import React, { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Calendar, TrendingUp, TrendingDown, Users, Euro, FileText, AlertTriangle, CheckCircle, Info, Activity, Clock, Target, UserCheck, BarChart3, PieChart, LineChart, Zap, Edit, Save, X, ChevronLeft, ChevronRight, Calculator, Presentation, Star, Trophy, Shield, Sparkles, Heart, Award, TrendingUpIcon, Globe } from 'lucide-react';

function App() {
  // Données historiques COMPLÈTES avec TOUS les indicateurs
  const donneesHistoriquesCompletes = [
    {
      mois: 'mars',
      annee: 2025,
      metriques_activite: {
        debuts_traitement: 48,
        cumul_debuts_traitement: 201,
        premieres_consultations: 43,
        cumul_premieres_consultations: 299,
        deposes: 21,
        cumul_deposes: 134,
        recettes_mois: 176000,
        cumul_recettes: 969000,
        rdv_manques: 159,
        rdv_presents: 878,
        taux_rdv_manques: 18.0
      },
      ressources_humaines: {
        jours_collaborateur: 20,
        jours_dr_vergez: 12
      },
      consultations_cse: {
        nombre_cse: 22,
        cumul_cse: 155,
        en_traitement_attente_cse: 1,
        cumul_traitement_cse: 32,
        taux_transformation_cse: 5.0
      },
      diagnostics_enfants: {
        nombre_diagnostics_enfants: 19,
        cumul_diag_enfants: 135,
        en_traitement_attente_enfants: 14,
        cumul_traitement_diag: 106,
        taux_transformation_enfants: 74.0
      },
      consultations_csa: {
        nombre_csa: 21,
        cumul_csa: 142,
        en_traitement_attente_csa: 0,
        cumul_traitement_csa: 4,
        taux_transformation_csa: 0.0
      },
      devis: {
        total_devis_acceptes: 79000,
        nombre_devis_acceptes: 18
      },
      comparaisons: {
        debuts_traitement_evolution: 37.0,
        premieres_consultations_evolution: -42.0,
        deposes_evolution: -9.0,
        recettes_evolution: -10.0,
        rdv_manques_evolution: 6.0,
        rdv_presents_evolution: -5.0,
        jours_collaborateur_evolution: 11.0,
        jours_vergez_evolution: -20.0,
        cse_evolution: -46.0,
        cse_traitement_evolution: -94.0,
        diagnostics_enfants_evolution: -49.0,
        diagnostics_traitement_evolution: -42.0,
        csa_evolution: -36.0,
        csa_traitement_evolution: -100.0,
        devis_total_evolution: -65.0,
        devis_nombre_evolution: -59.0
      }
    },
    {
      mois: 'avril',
      annee: 2025,
      metriques_activite: {
        debuts_traitement: 37,
        cumul_debuts_traitement: 238,
        premieres_consultations: 35,
        cumul_premieres_consultations: 334,
        deposes: 23,
        cumul_deposes: 157,
        recettes_mois: 166000,
        cumul_recettes: 1135000,
        rdv_manques: 148,
        rdv_presents: 880,
        taux_rdv_manques: 17.0
      },
      ressources_humaines: {
        jours_collaborateur: 19,
        jours_dr_vergez: 9
      },
      consultations_cse: {
        nombre_cse: 19,
        cumul_cse: 174,
        en_traitement_attente_cse: 0,
        cumul_traitement_cse: 32,
        taux_transformation_cse: 0.0
      },
      diagnostics_enfants: {
        nombre_diagnostics_enfants: 14,
        cumul_diag_enfants: 149,
        en_traitement_attente_enfants: 5,
        cumul_traitement_diag: 111,
        taux_transformation_enfants: 36.0
      },
      consultations_csa: {
        nombre_csa: 16,
        cumul_csa: 158,
        en_traitement_attente_csa: 0,
        cumul_traitement_csa: 4,
        taux_transformation_csa: 0.0
      },
      devis: {
        total_devis_acceptes: 111000,
        nombre_devis_acceptes: 20
      },
      comparaisons: {
        debuts_traitement_evolution: 23.0,
        premieres_consultations_evolution: -46.0,
        deposes_evolution: 10.0,
        recettes_evolution: 5.0,
        rdv_manques_evolution: 11.0,
        rdv_presents_evolution: 6.0,
        jours_collaborateur_evolution: 6.0,
        jours_vergez_evolution: -25.0,
        cse_evolution: -41.0,
        cse_traitement_evolution: -100.0,
        diagnostics_enfants_evolution: -50.0,
        diagnostics_traitement_evolution: -75.0,
        csa_evolution: -52.0,
        csa_traitement_evolution: -100.0,
        devis_total_evolution: -33.0,
        devis_nombre_evolution: -41.0
      }
    },
    {
      mois: 'mai',
      annee: 2025,
      metriques_activite: {
        debuts_traitement: 41,
        cumul_debuts_traitement: 279,
        premieres_consultations: 37,
        cumul_premieres_consultations: 371,
        deposes: 22,
        cumul_deposes: 179,
        recettes_mois: 167000,
        cumul_recettes: 1302000,
        rdv_manques: 131,
        rdv_presents: 900,
        taux_rdv_manques: 15.0
      },
      ressources_humaines: {
        jours_collaborateur: 19,
        jours_dr_vergez: 13
      },
      consultations_cse: {
        nombre_cse: 20,
        cumul_cse: 194,
        en_traitement_attente_cse: 3,
        cumul_traitement_cse: 35,
        taux_transformation_cse: 15.0
      },
      diagnostics_enfants: {
        nombre_diagnostics_enfants: 19,
        cumul_diag_enfants: 168,
        en_traitement_attente_enfants: 15,
        cumul_traitement_diag: 126,
        taux_transformation_enfants: 79.0
      },
      consultations_csa: {
        nombre_csa: 17,
        cumul_csa: 175,
        en_traitement_attente_csa: 0,
        cumul_traitement_csa: 4,
        taux_transformation_csa: 0.0
      },
      devis: {
        total_devis_acceptes: 120000,
        nombre_devis_acceptes: 23
      },
      comparaisons: {
        debuts_traitement_evolution: 37.0,
        premieres_consultations_evolution: -3.0,
        deposes_evolution: -12.0,
        recettes_evolution: 1.0,
        rdv_manques_evolution: 9.0,
        rdv_presents_evolution: 12.0,
        jours_collaborateur_evolution: 6.0,
        jours_vergez_evolution: 30.0,
        cse_evolution: 33.0,
        cse_traitement_evolution: -50.0,
        diagnostics_enfants_evolution: -5.0,
        diagnostics_traitement_evolution: 7.0,
        csa_evolution: -26.0,
        csa_traitement_evolution: -100.0,
        devis_total_evolution: -26.0,
        devis_nombre_evolution: -26.0
      }
    }
  ];

  const [selectedMonth, setSelectedMonth] = useState('mai');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [currentData, setCurrentData] = useState(donneesHistoriquesCompletes[2]); // Mai par défaut

  const [tableaux, setTableaux] = useState([]);
  const [recommandations, setRecommandations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  const moisOptions = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  const anneeOptions = [2023, 2024, 2025, 2026];

  useEffect(() => {
    chargerTableaux();
    chargerRecommandations();
  }, []);

  useEffect(() => {
    loadSelectedMonthData();
  }, [selectedMonth, selectedYear]);

  const loadSelectedMonthData = () => {
    const donneesMois = donneesHistoriquesCompletes.find(
      d => d.mois === selectedMonth && d.annee === selectedYear
    );

    if (donneesMois) {
      setCurrentData(donneesMois);
    }
  };

  const chargerTableaux = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/tableau-bord-complet`);
      const data = await response.json();
      setTableaux(data.tableaux || []);
    } catch (error) {
      console.error('Erreur chargement tableaux:', error);
    }
  };

  const chargerRecommandations = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/recommandations-completes`);
      const data = await response.json();
      setRecommandations(data.recommandations || []);
    } catch (error) {
      console.error('Erreur chargement recommandations:', error);
    }
  };

  const sauvegarderDonnees = async () => {
    setLoading(true);
    try {
      const dataToSend = {
        mois: currentData.mois,
        annee: currentData.annee,
        metriques_activite: currentData.metriques_activite,
        ressources_humaines: currentData.ressources_humaines,
        consultations_cse: currentData.consultations_cse,
        diagnostics_enfants: currentData.diagnostics_enfants,
        consultations_csa: currentData.consultations_csa,
        devis: currentData.devis,
        comparaisons: currentData.comparaisons
      };

      const response = await fetch(`${backendUrl}/api/tableau-bord-complet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
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

  const navigateMonth = (direction) => {
    const currentIndex = moisOptions.findIndex(m => m === selectedMonth);
    let newIndex = currentIndex + direction;
    let newYear = selectedYear;

    if (newIndex < 0) {
      newIndex = 11;
      newYear = selectedYear - 1;
    } else if (newIndex > 11) {
      newIndex = 0;
      newYear = selectedYear + 1;
    }

    setSelectedMonth(moisOptions[newIndex]);
    setSelectedYear(newYear);
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

  const SimpleChart = ({ data, dataKey, title, color = "#3b82f6" }) => {
    const maxValue = Math.max(...data.map(d => d.metriques_activite?.[dataKey] || d[dataKey] || 0));
    const minValue = Math.min(...data.map(d => d.metriques_activite?.[dataKey] || d[dataKey] || 0));
    
    return (
      <div className="chart-container">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
        <div className="flex items-end justify-between h-20 gap-2">
          {data.map((item, index) => {
            const value = item.metriques_activite?.[dataKey] || item[dataKey] || 0;
            const height = maxValue > minValue ? ((value - minValue) / (maxValue - minValue)) * 100 : 50;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs font-medium mb-1" style={{color}}>
                  {dataKey === 'recettes_mois' ? `${Math.round(value / 1000)}K` : value}
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
      {/* Header avec logo et sélecteur */}
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
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="ortho-manager-logo h-16 w-20 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-xl p-3 backdrop-blur-sm border border-white/20 shadow-xl flex items-center justify-center">
                  <div className="text-white font-bold text-lg leading-tight text-center">
                    <div className="text-xs font-semibold tracking-wider">ORTHO</div>
                    <div className="text-sm font-black">MANAGER</div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  SELARL Dr VERGEZ
                </h1>
                <p className="text-blue-100 text-lg">Tableau de bord orthodontique • Analytics & Performance</p>
                <div className="flex items-center mt-2">
                  <div className="text-xs text-blue-200/80 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                    Powered by OrthoManager
                  </div>
                </div>
                <div className="flex items-center mt-4 space-x-6">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Calculator className="w-5 h-5 mr-2" />
                    <span className="text-sm">Cumul recettes: {currentData.metriques_activite.cumul_recettes?.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="text-sm">Cumul débuts: {currentData.metriques_activite.cumul_debuts_traitement}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sélecteur de mois/année */}
            <div className="text-right">
              <div className="flex items-center space-x-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth(-1)}
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <Badge className="text-lg px-6 py-3 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  {selectedMonth} {selectedYear}
                </Badge>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth(1)}
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moisOptions.map(mois => (
                      <SelectItem key={mois} value={mois} className="capitalize">
                        {mois}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedYear.toString()} onValueChange={(year) => setSelectedYear(parseInt(year))}>
                  <SelectTrigger className="w-20 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {anneeOptions.map(annee => (
                      <SelectItem key={annee} value={annee.toString()}>
                        {annee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="presentation" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              <Presentation className="w-4 h-4 mr-2" />
              Présentation
            </TabsTrigger>
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

          <TabsContent value="presentation">
            {/* Hero Section */}
            <div className="powerbi-section mb-8 text-center">
              <div className="powerbi-section-header">
                <div className="flex items-center justify-center mb-6">
                  <div className="ortho-manager-logo h-20 w-24 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-xl flex items-center justify-center mr-4">
                    <div className="text-white font-bold text-xl leading-tight text-center">
                      <div className="text-sm font-semibold tracking-wider">ORTHO</div>
                      <div className="text-lg font-black">MANAGER</div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                      OrthoManager
                    </h1>
                    <p className="text-lg text-blue-200">La solution complète de gestion orthodontique</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-12">
                <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                  Transformez votre cabinet orthodontique avec une solution de gestion moderne, 
                  intuitive et puissante conçue spécialement pour les professionnels de l'orthodontie.
                </p>
              </div>

              {/* Fonctionnalités principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-blue-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Analytics Avancées</h3>
                    <p className="text-slate-300">
                      Tableaux de bord PowerBI-style avec métriques en temps réel, comparaisons N-1, 
                      et visualisations interactives pour un pilotage optimal de votre activité.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-green-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Suivi Performance</h3>
                    <p className="text-slate-300">
                      Monitoring complet des débuts de traitement, consultations, taux de transformation, 
                      et performance financière avec alertes automatiques.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-purple-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">IA & Recommandations</h3>
                    <p className="text-slate-300">
                      Intelligence artificielle intégrée pour analyser vos performances et générer 
                      des recommandations personnalisées d'amélioration.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl p-6 border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-orange-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Gestion Temps Réel</h3>
                    <p className="text-slate-300">
                      Saisie simplifiée des données, historiques complets, et mise à jour 
                      automatique de tous vos indicateurs de performance.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-xl p-6 border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-teal-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Sécurité & Fiabilité</h3>
                    <p className="text-slate-300">
                      Données sécurisées, sauvegardes automatiques, et architecture cloud 
                      hautement disponible pour une tranquillité d'esprit totale.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/10 rounded-xl p-6 border border-rose-400/20 hover:border-rose-400/40 transition-all duration-300">
                  <div className="text-center">
                    <div className="bg-rose-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Support Réunionnais</h3>
                    <p className="text-slate-300">
                      Développé et supporté depuis l'île de la Réunion, avec une compréhension 
                      unique des besoins des praticiens de l'océan Indien.
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistiques d'impact */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">+300%</div>
                  <p className="text-slate-300">Amélioration visibilité</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">-50%</div>
                  <p className="text-slate-300">Temps de reporting</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">+200%</div>
                  <p className="text-slate-300">Efficacité gestion</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
                  <p className="text-slate-300">Orthodontistes satisfaits</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Rejoignez la Révolution OrthoManager !
                </h2>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                  Découvrez pourquoi les orthodontistes de l'océan Indien font confiance à OrthoManager 
                  pour optimiser leur pratique et améliorer leurs résultats.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
                    <Star className="w-5 h-5 mr-2" />
                    Essai Gratuit 30 jours
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                    <Globe className="w-5 h-5 mr-2" />
                    Demander une Démo
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            {/* KPIs principaux avec TOUTES les données */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Recettes avec cumul */}
              <div className="powerbi-card bg-gradient-to-br from-blue-500 to-blue-600">
                <div className="flex items-center justify-between mb-2">
                  <Euro className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-xs">Recettes du mois</div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(currentData.metriques_activite.recettes_mois / 1000)}K€
                    </div>
                    <div className="text-white/70 text-xs">
                      Cumul: {Math.round(currentData.metriques_activite.cumul_recettes / 1000)}K€
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center px-2 py-1 rounded-full bg-white/20 text-xs`}>
                    {getEvolutionIcon(currentData.comparaisons.recettes_evolution)}
                    <span className="ml-1 text-white">
                      {currentData.comparaisons.recettes_evolution > 0 ? '+' : ''}{currentData.comparaisons.recettes_evolution}% vs N-1
                    </span>
                  </div>
                </div>
              </div>

              {/* Débuts de traitement avec cumul */}
              <div className="powerbi-card bg-gradient-to-br from-green-500 to-green-600">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-xs">Débuts traitement</div>
                    <div className="text-2xl font-bold text-white">
                      {currentData.metriques_activite.debuts_traitement}
                    </div>
                    <div className="text-white/70 text-xs">
                      Cumul: {currentData.metriques_activite.cumul_debuts_traitement}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center px-2 py-1 rounded-full bg-white/20 text-xs">
                    {getEvolutionIcon(currentData.comparaisons.debuts_traitement_evolution)}
                    <span className="ml-1 text-white">
                      +{currentData.comparaisons.debuts_traitement_evolution}% vs N-1
                    </span>
                  </div>
                </div>
              </div>

              {/* Consultations avec cumul */}
              <div className="powerbi-card bg-gradient-to-br from-purple-500 to-purple-600">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-xs">Consultations</div>
                    <div className="text-2xl font-bold text-white">
                      {currentData.metriques_activite.premieres_consultations}
                    </div>
                    <div className="text-white/70 text-xs">
                      Cumul: {currentData.metriques_activite.cumul_premieres_consultations}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center px-2 py-1 rounded-full bg-white/20 text-xs">
                    {getEvolutionIcon(currentData.comparaisons.premieres_consultations_evolution)}
                    <span className="ml-1 text-white">
                      {currentData.comparaisons.premieres_consultations_evolution}% vs N-1
                    </span>
                  </div>
                </div>
              </div>

              {/* RDV Manqués avec taux */}
              <div className="powerbi-card bg-gradient-to-br from-orange-500 to-orange-600">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-white opacity-80" />
                  <div className="text-right">
                    <div className="text-white/80 text-xs">RDV Manqués</div>
                    <div className="text-2xl font-bold text-white">
                      {currentData.metriques_activite.rdv_manques}
                    </div>
                    <div className="text-white/70 text-xs">
                      Taux: {currentData.metriques_activite.taux_rdv_manques}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center px-2 py-1 rounded-full bg-white/20 text-xs">
                    {getEvolutionIcon(currentData.comparaisons.rdv_manques_evolution)}
                    <span className="ml-1 text-white">
                      {currentData.comparaisons.rdv_manques_evolution > 0 ? '+' : ''}{currentData.comparaisons.rdv_manques_evolution}% vs N-1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections détaillées COMPLÈTES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {/* Performance CSE COMPLÈTE */}
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">Performance CSE Complète</h3>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${currentData.consultations_cse.taux_transformation_cse < 20 ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Nombre CSE:</span>
                    <span className="font-bold text-white">{currentData.consultations_cse.nombre_cse}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Cumul CSE:</span>
                    <span className="font-bold text-blue-400">{currentData.consultations_cse.cumul_cse}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">En traitement:</span>
                    <span className="font-bold text-white">{currentData.consultations_cse.en_traitement_attente_cse}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Cumul traitement:</span>
                    <span className="font-bold text-blue-400">{currentData.consultations_cse.cumul_traitement_cse}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 text-sm">Taux transformation:</span>
                      <span className={`font-bold ${currentData.consultations_cse.taux_transformation_cse < 20 ? 'text-red-400' : 'text-green-400'}`}>
                        {currentData.consultations_cse.taux_transformation_cse}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-700 ${currentData.consultations_cse.taux_transformation_cse < 20 ? 'bg-red-400' : 'bg-green-400'}`}
                        style={{ width: `${Math.min(currentData.consultations_cse.taux_transformation_cse, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-slate-400">Évolution: {currentData.comparaisons.cse_evolution > 0 ? '+' : ''}{currentData.comparaisons.cse_evolution}%</span>
                      <span className="text-slate-400">Trait.: {currentData.comparaisons.cse_traitement_evolution}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostics Enfants COMPLET */}
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">Pédodontie Complète</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Diagnostics:</span>
                    <span className="font-bold text-white">{currentData.diagnostics_enfants.nombre_diagnostics_enfants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Cumul diagnostics:</span>
                    <span className="font-bold text-green-400">{currentData.diagnostics_enfants.cumul_diag_enfants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">En traitement:</span>
                    <span className="font-bold text-white">{currentData.diagnostics_enfants.en_traitement_attente_enfants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Cumul traitement:</span>
                    <span className="font-bold text-green-400">{currentData.diagnostics_enfants.cumul_traitement_diag}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 text-sm">Taux transformation:</span>
                      <span className="font-bold text-green-400">{currentData.diagnostics_enfants.taux_transformation_enfants}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(currentData.diagnostics_enfants.taux_transformation_enfants, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-slate-400">Évolution: {currentData.comparaisons.diagnostics_enfants_evolution}%</span>
                      <span className="text-slate-400">Trait.: {currentData.comparaisons.diagnostics_traitement_evolution > 0 ? '+' : ''}{currentData.comparaisons.diagnostics_traitement_evolution}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSA COMPLET + Devis */}
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">CSA & Devis</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="pb-2 border-b border-slate-600">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-sm">CSA ce mois:</span>
                      <span className="font-bold text-white">{currentData.consultations_csa.nombre_csa}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Cumul CSA:</span>
                      <span className="font-bold text-orange-400">{currentData.consultations_csa.cumul_csa}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Transformation: {currentData.consultations_csa.taux_transformation_csa}% ({currentData.comparaisons.csa_evolution}% évol.)
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-sm">Devis acceptés:</span>
                      <span className="font-bold text-white">{currentData.devis.nombre_devis_acceptes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Total devis:</span>
                      <span className="font-bold text-emerald-400">{Math.round(currentData.devis.total_devis_acceptes / 1000)}K€</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Évolution: {currentData.comparaisons.devis_nombre_evolution}% (nombre), {currentData.comparaisons.devis_total_evolution}% (montant)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Ressources Humaines + Déposes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">Ressources Humaines</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Dr Vergez:</span>
                    <div className="flex items-center">
                      <span className="font-bold text-white mr-2">{currentData.ressources_humaines.jours_dr_vergez} jours</span>
                      <div className={`flex items-center text-xs px-2 py-1 rounded ${getEvolutionColor(currentData.comparaisons.jours_vergez_evolution)}`}>
                        {getEvolutionIcon(currentData.comparaisons.jours_vergez_evolution)}
                        <span className="ml-1">{currentData.comparaisons.jours_vergez_evolution > 0 ? '+' : ''}{currentData.comparaisons.jours_vergez_evolution}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Collaborateur:</span>
                    <div className="flex items-center">
                      <span className="font-bold text-white mr-2">{currentData.ressources_humaines.jours_collaborateur} jours</span>
                      <div className={`flex items-center text-xs px-2 py-1 rounded ${getEvolutionColor(currentData.comparaisons.jours_collaborateur_evolution)}`}>
                        {getEvolutionIcon(currentData.comparaisons.jours_collaborateur_evolution)}
                        <span className="ml-1">{currentData.comparaisons.jours_collaborateur_evolution > 0 ? '+' : ''}{currentData.comparaisons.jours_collaborateur_evolution}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-lg font-bold text-white">Déposes & RDV</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Déposes ce mois:</span>
                    <span className="font-bold text-white">{currentData.metriques_activite.deposes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Cumul déposes:</span>
                    <span className="font-bold text-yellow-400">{currentData.metriques_activite.cumul_deposes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">RDV présents:</span>
                    <span className="font-bold text-green-400">{currentData.metriques_activite.rdv_presents}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Évolution déposes: {currentData.comparaisons.deposes_evolution}% | RDV: {currentData.comparaisons.rdv_presents_evolution > 0 ? '+' : ''}{currentData.comparaisons.rdv_presents_evolution}%
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriquesCompletes} 
                  dataKey="recettes_mois" 
                  title="Recettes Mensuelles (Mars-Mai 2025)"
                  color="#3b82f6"
                />
              </div>

              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriquesCompletes} 
                  dataKey="debuts_traitement" 
                  title="Débuts de Traitement"
                  color="#10b981"
                />
              </div>

              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriquesCompletes} 
                  dataKey="premieres_consultations" 
                  title="Premières Consultations"
                  color="#8b5cf6"
                />
              </div>

              <div className="powerbi-section p-6">
                <SimpleChart 
                  data={donneesHistoriquesCompletes.map(d => ({ ...d, taux_transformation_enfants: d.diagnostics_enfants.taux_transformation_enfants }))}
                  dataKey="taux_transformation_enfants" 
                  title="Taux Transformation Enfants (%)"
                  color="#f59e0b"
                />
              </div>
            </div>

            {/* Tableau détaillé COMPLET */}
            <div className="powerbi-section">
              <div className="powerbi-section-header">
                <h3 className="text-xl font-bold text-white">Tableau Complet Mars-Mai 2025</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Indicateur</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Mars</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Avril</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Mai</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Débuts traitement</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.debuts_traitement}</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.debuts_traitement}</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.debuts_traitement}</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Cumul débuts</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.cumul_debuts_traitement}</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.cumul_debuts_traitement}</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.cumul_debuts_traitement}</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Consultations</td>
                      <td className="py-2 px-2 text-purple-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.premieres_consultations}</td>
                      <td className="py-2 px-2 text-purple-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.premieres_consultations}</td>
                      <td className="py-2 px-2 text-purple-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.premieres_consultations}</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Recettes (K€)</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.recettes_mois / 1000}K</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.recettes_mois / 1000}K</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.recettes_mois / 1000}K</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Cumul recettes (K€)</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.cumul_recettes / 1000}K</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.cumul_recettes / 1000}K</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.cumul_recettes / 1000}K</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Taux transf. enfants (%)</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[0].diagnostics_enfants.taux_transformation_enfants}%</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[1].diagnostics_enfants.taux_transformation_enfants}%</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[2].diagnostics_enfants.taux_transformation_enfants}%</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Taux transf. CSE (%)</td>
                      <td className="py-2 px-2 text-red-400 font-bold">{donneesHistoriquesCompletes[0].consultations_cse.taux_transformation_cse}%</td>
                      <td className="py-2 px-2 text-red-400 font-bold">{donneesHistoriquesCompletes[1].consultations_cse.taux_transformation_cse}%</td>
                      <td className="py-2 px-2 text-yellow-400 font-bold">{donneesHistoriquesCompletes[2].consultations_cse.taux_transformation_cse}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saisie">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Module de saisie en développement</p>
              <p className="text-sm text-slate-500">Les données complètes sont déjà intégrées pour mars-mai 2025</p>
              <Button
                onClick={sauvegarderDonnees}
                disabled={loading}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
              >
                {loading ? 'Sauvegarde...' : 'Sauvegarder données actuelles'}
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
                  Analyse complète des performances orthodontiques avec recommandations expertes
                </p>
                
                {recommandations.length === 0 ? (
                  <div className="text-center py-12">
                    <Zap className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">Générez des recommandations</p>
                    <p className="text-sm text-slate-500">Cliquez sur sauvegarder pour déclencher l'analyse IA complète</p>
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
                <h3 className="text-xl font-bold text-white">Données Historiques Complètes</h3>
              </div>
              
              {tableaux.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Aucun tableau de bord sauvegardé</p>
                  <p className="text-sm text-slate-500">Les données historiques s'afficheront après sauvegarde</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Période</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Recettes</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Cumul recettes</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Débuts</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Cumul débuts</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Consultations</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Transf. Enfants</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableaux.map((tableau, index) => (
                        <tr key={tableau.id || index} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-medium text-white capitalize">{tableau.mois} {tableau.annee}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-blue-400">{tableau.metriques_activite.recettes_mois.toLocaleString('fr-FR')}€</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-emerald-400">{tableau.metriques_activite.cumul_recettes.toLocaleString('fr-FR')}€</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-green-400">{tableau.metriques_activite.debuts_traitement}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-green-300">{tableau.metriques_activite.cumul_debuts_traitement}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-purple-400">{tableau.metriques_activite.premieres_consultations}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-orange-400">{tableau.diagnostics_enfants.taux_transformation_enfants}%</span>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-400">
                            {new Date(tableau.date_creation).toLocaleDateString('fr-FR')}
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
      
      {/* Footer OrthoManager */}
      <footer className="mt-16 py-6 border-t border-white/10 bg-gradient-to-r from-slate-900/80 to-blue-900/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-slate-300 text-sm">
              Application développée par <span className="font-semibold text-blue-400">OrthoManager</span> entreprise basée à l'île de la Réunion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;