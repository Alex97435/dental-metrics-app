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
    },
    {
      mois: 'juin',
      annee: 2025,
      metriques_activite: {
        debuts_traitement: 30,
        cumul_debuts_traitement: 309,
        premieres_consultations: 54,
        cumul_premieres_consultations: 425,
        deposes: 32,
        cumul_deposes: 211,
        recettes_mois: 167000,
        cumul_recettes: 1468000,
        rdv_manques: 168,
        rdv_presents: 851,
        taux_rdv_manques: 20.0
      },
      ressources_humaines: {
        jours_collaborateur: 18,
        jours_dr_vergez: 11
      },
      consultations_cse: {
        nombre_cse: 30,
        cumul_cse: 224,
        en_traitement_attente_cse: 6,
        cumul_traitement_cse: 41,
        taux_transformation_cse: 20.0
      },
      diagnostics_enfants: {
        nombre_diagnostics_enfants: 23,
        cumul_diag_enfants: 191,
        en_traitement_attente_enfants: 14,
        cumul_traitement_diag: 140,
        taux_transformation_enfants: 61.0
      },
      consultations_csa: {
        nombre_csa: 24,
        cumul_csa: 199,
        en_traitement_attente_csa: 1,
        cumul_traitement_csa: 5,
        taux_transformation_csa: 4.0
      },
      devis: {
        total_devis_acceptes: 103000,
        nombre_devis_acceptes: 19
      },
      comparaisons: {
        debuts_traitement_evolution: -3.0,
        premieres_consultations_evolution: 93.0,
        deposes_evolution: 0.0,
        recettes_evolution: 5.0,
        rdv_manques_evolution: 35.0,
        rdv_presents_evolution: 15.0,
        jours_collaborateur_evolution: 0.0,
        jours_vergez_evolution: 10.0,
        cse_evolution: 88.0,
        cse_traitement_evolution: 20.0,
        diagnostics_enfants_evolution: 53.0,
        diagnostics_traitement_evolution: 27.0,
        csa_evolution: 100.0,
        csa_traitement_evolution: 0.0,
        devis_total_evolution: -17.0,
        devis_nombre_evolution: -16.0
      }
    },
    {
      mois: 'juillet',
      annee: 2025,
      metriques_activite: {
        debuts_traitement: 20,
        cumul_debuts_traitement: 329,
        premieres_consultations: 35,
        cumul_premieres_consultations: 460,
        deposes: 15,
        cumul_deposes: 226,
        recettes_mois: 126000,
        cumul_recettes: 1594000,
        rdv_manques: 129,
        rdv_presents: 674,
        taux_rdv_manques: 19.0
      },
      ressources_humaines: {
        jours_collaborateur: 12,
        jours_dr_vergez: 9
      },
      consultations_cse: {
        nombre_cse: 19,
        cumul_cse: 243,
        en_traitement_attente_cse: 5,
        cumul_traitement_cse: 46,
        taux_transformation_cse: 26.0
      },
      diagnostics_enfants: {
        nombre_diagnostics_enfants: 16,
        cumul_diag_enfants: 207,
        en_traitement_attente_enfants: 10,
        cumul_traitement_diag: 150,
        taux_transformation_enfants: 63.0
      },
      consultations_csa: {
        nombre_csa: 16,
        cumul_csa: 215,
        en_traitement_attente_csa: 0,
        cumul_traitement_csa: 5,
        taux_transformation_csa: 0.0
      },
      devis: {
        total_devis_acceptes: 62000,
        nombre_devis_acceptes: 12
      },
      comparaisons: {
        debuts_traitement_evolution: -29.0,
        premieres_consultations_evolution: -8.0,
        deposes_evolution: -42.0,
        recettes_evolution: -20.0,
        rdv_manques_evolution: -10.0,
        rdv_presents_evolution: -9.0,
        jours_collaborateur_evolution: -20.0,
        jours_vergez_evolution: -25.0,
        cse_evolution: -17.0,
        cse_traitement_evolution: -44.0,
        diagnostics_enfants_evolution: -16.0,
        diagnostics_traitement_evolution: -38.0,
        csa_evolution: 7.0,
        csa_traitement_evolution: -100.0,
        devis_total_evolution: -58.0,
        devis_nombre_evolution: -62.0
      }
    }
  ];

  const [selectedMonth, setSelectedMonth] = useState('juillet');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [currentData, setCurrentData] = useState(donneesHistoriquesCompletes[4]); // Juillet par défaut

  const [tableaux, setTableaux] = useState([]);
  const [recommandations, setRecommandations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('presentation');
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
                  intuitive et puissante conçue spécialement pour les orthodontistes en France.
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
                      unique des besoins des orthodontistes français et de leurs spécificités métier.
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
                  Découvrez pourquoi les orthodontistes français font confiance à OrthoManager 
                  pour optimiser leur pratique et améliorer leurs résultats.
                </p>
                <div className="text-center">
                  <p className="text-lg text-blue-200 font-semibold">
                    🇫🇷 Solution française • Support expert • Innovation continue
                  </p>
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
            {/* Header Analytics */}
            <div className="powerbi-section mb-8">
              <div className="powerbi-section-header">
                <h3 className="text-3xl font-bold text-white flex items-center">
                  <LineChart className="w-10 h-10 mr-4 text-blue-400" />
                  Analytics & Visualisations Avancées
                </h3>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  Mars - Juillet 2025
                </Badge>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                Analyse complète de vos performances orthodontiques avec visualisations interactives 
                et comparaisons temporelles pour optimiser votre prise de décision.
              </p>
            </div>

            {/* KPIs en un coup d'œil */}
            <div className="powerbi-section mb-8">
              <div className="powerbi-section-header">
                <h4 className="text-xl font-semibold text-white">📊 Évolution des KPIs Principaux</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {donneesHistoriquesCompletes[4].metriques_activite.debuts_traitement}
                  </div>
                  <p className="text-slate-300 text-sm">Débuts Juillet</p>
                  <div className="text-xs text-red-400 mt-1">
                    {donneesHistoriquesCompletes[4].comparaisons.debuts_traitement_evolution}% vs N-1
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {donneesHistoriquesCompletes[4].metriques_activite.premieres_consultations}
                  </div>
                  <p className="text-slate-300 text-sm">Consultations</p>
                  <div className="text-xs text-red-400 mt-1">
                    {donneesHistoriquesCompletes[4].comparaisons.premieres_consultations_evolution}% vs N-1
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {Math.round(donneesHistoriquesCompletes[4].metriques_activite.recettes_mois / 1000)}K€
                  </div>
                  <p className="text-slate-300 text-sm">Recettes Juillet</p>
                  <div className="text-xs text-red-400 mt-1">
                    {donneesHistoriquesCompletes[4].comparaisons.recettes_evolution}% vs N-1
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {donneesHistoriquesCompletes[4].diagnostics_enfants.taux_transformation_enfants}%
                  </div>
                  <p className="text-slate-300 text-sm">Taux Enfants</p>
                  <div className="text-xs text-red-400 mt-1">
                    {donneesHistoriquesCompletes[4].comparaisons.diagnostics_traitement_evolution}% vs N-1
                  </div>
                </div>
              </div>
            </div>

            {/* Graphiques avec titres explicatifs */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              <div className="powerbi-section p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center">
                    <Euro className="w-6 h-6 mr-2 text-blue-400" />
                    Évolution des Recettes
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Tendance croissante avec +1% en mai vs N-1. Objectif: maintenir la progression.
                  </p>
                </div>
                <SimpleChart 
                  data={donneesHistoriquesCompletes} 
                  dataKey="recettes_mois" 
                  title="Recettes Mensuelles (K€)"
                  color="#3b82f6"
                />
                <div className="mt-4 text-center">
                  <span className="text-xs text-slate-400">
                    📈 Moyenne: {Math.round(donneesHistoriquesCompletes.reduce((acc, d) => acc + d.metriques_activite.recettes_mois, 0) / donneesHistoriquesCompletes.length / 1000)}K€
                  </span>
                </div>
              </div>

              <div className="powerbi-section p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-green-400" />
                    Performance Traitement
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Excellente performance: +37% en mai. Maintenir cette dynamique positive.
                  </p>
                </div>
                <SimpleChart 
                  data={donneesHistoriquesCompletes} 
                  dataKey="debuts_traitement" 
                  title="Débuts de Traitement"
                  color="#10b981"
                />
                <div className="mt-4 text-center">
                  <span className="text-xs text-slate-400">
                    🎯 Total cumulé: {donneesHistoriquesCompletes[2].metriques_activite.cumul_debuts_traitement} débuts
                  </span>
                </div>
              </div>

              <div className="powerbi-section p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-purple-400" />
                    Flux Consultations
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Légère baisse en mai (-3% vs N-1). Optimiser la prospection.
                  </p>
                </div>
                <SimpleChart 
                  data={donneesHistoriquesCompletes} 
                  dataKey="premieres_consultations" 
                  title="Premières Consultations"
                  color="#8b5cf6"
                />
                <div className="mt-4 text-center">
                  <span className="text-xs text-slate-400">
                    👥 Total cumulé: {donneesHistoriquesCompletes[2].metriques_activite.cumul_premieres_consultations} consultations
                  </span>
                </div>
              </div>

              <div className="powerbi-section p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-orange-400" />
                    Taux de Conversion Pédodontie
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Excellent taux: 79% en mai (+7% vs N-1). Performance remarquable.
                  </p>
                </div>
                <SimpleChart 
                  data={donneesHistoriquesCompletes.map(d => ({ ...d, taux_transformation_enfants: d.diagnostics_enfants.taux_transformation_enfants }))}
                  dataKey="taux_transformation_enfants" 
                  title="Taux Transformation Enfants (%)"
                  color="#f59e0b"
                />
                <div className="mt-4 text-center">
                  <span className="text-xs text-slate-400">
                    🎯 Objectif atteint: &gt;75% (Mai: 79%)
                  </span>
                </div>
              </div>
            </div>

            {/* Insights et Recommandations basées sur les données */}
            <div className="powerbi-section mb-8">
              <div className="powerbi-section-header">
                <h4 className="text-xl font-semibold text-white flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                  Insights Automatiques
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                    <h5 className="text-green-400 font-semibold">Point Fort</h5>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Performance de juillet: 63% (baisse vs 79% en mai). 
                    Maintenir la qualité malgré la période estivale.
                  </p>
                </div>
                
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mr-2" />
                    <h5 className="text-orange-400 font-semibold">Attention</h5>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Amélioration CSE notable: de 15% (mai) à 26% (juillet). 
                    Tendance positive à consolider en septembre.
                  </p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Target className="w-5 h-5 text-blue-400 mr-2" />
                    <h5 className="text-blue-400 font-semibold">Opportunité</h5>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Débuts en forte croissance (+37%). Anticiper les besoins 
                    en capacité pour maintenir la qualité.
                  </p>
                </div>
              </div>
            </div>

            {/* Tableau détaillé COMPLET */}
            <div className="powerbi-section">
              <div className="powerbi-section-header">
                <h3 className="text-xl font-bold text-white">Tableau Complet Mars-Juillet 2025</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Indicateur</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Mars</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Avril</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Mai</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Juin</th>
                      <th className="text-left py-3 px-2 font-semibold text-slate-300">Juillet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Débuts traitement</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.debuts_traitement}</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.debuts_traitement}</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.debuts_traitement}</td>
                      <td className="py-2 px-2 text-yellow-400 font-bold">{donneesHistoriquesCompletes[3].metriques_activite.debuts_traitement}</td>
                      <td className="py-2 px-2 text-red-400 font-bold">{donneesHistoriquesCompletes[4].metriques_activite.debuts_traitement}</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Cumul débuts</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.cumul_debuts_traitement}</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.cumul_debuts_traitement}</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.cumul_debuts_traitement}</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[3].metriques_activite.cumul_debuts_traitement}</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[4].metriques_activite.cumul_debuts_traitement}</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Consultations</td>
                      <td className="py-2 px-2 text-purple-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.premieres_consultations}</td>
                      <td className="py-2 px-2 text-purple-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.premieres_consultations}</td>
                      <td className="py-2 px-2 text-purple-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.premieres_consultations}</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[3].metriques_activite.premieres_consultations}</td>
                      <td className="py-2 px-2 text-purple-400 font-bold">{donneesHistoriquesCompletes[4].metriques_activite.premieres_consultations}</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Recettes (K€)</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.recettes_mois / 1000}K</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.recettes_mois / 1000}K</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.recettes_mois / 1000}K</td>
                      <td className="py-2 px-2 text-blue-400 font-bold">{donneesHistoriquesCompletes[3].metriques_activite.recettes_mois / 1000}K</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[4].metriques_activite.recettes_mois / 1000}K</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Cumul recettes (K€)</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[0].metriques_activite.cumul_recettes / 1000}K</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[1].metriques_activite.cumul_recettes / 1000}K</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[2].metriques_activite.cumul_recettes / 1000}K</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[3].metriques_activite.cumul_recettes / 1000}K</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">{donneesHistoriquesCompletes[4].metriques_activite.cumul_recettes / 1000}K</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Taux transf. enfants (%)</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[0].diagnostics_enfants.taux_transformation_enfants}%</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[1].diagnostics_enfants.taux_transformation_enfants}%</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[2].diagnostics_enfants.taux_transformation_enfants}%</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[3].diagnostics_enfants.taux_transformation_enfants}%</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{donneesHistoriquesCompletes[4].diagnostics_enfants.taux_transformation_enfants}%</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-2 px-2 text-slate-300">Taux transf. CSE (%)</td>
                      <td className="py-2 px-2 text-red-400 font-bold">{donneesHistoriquesCompletes[0].consultations_cse.taux_transformation_cse}%</td>
                      <td className="py-2 px-2 text-red-400 font-bold">{donneesHistoriquesCompletes[1].consultations_cse.taux_transformation_cse}%</td>
                      <td className="py-2 px-2 text-yellow-400 font-bold">{donneesHistoriquesCompletes[2].consultations_cse.taux_transformation_cse}%</td>
                      <td className="py-2 px-2 text-yellow-400 font-bold">{donneesHistoriquesCompletes[3].consultations_cse.taux_transformation_cse}%</td>
                      <td className="py-2 px-2 text-green-400 font-bold">{donneesHistoriquesCompletes[4].consultations_cse.taux_transformation_cse}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saisie">
            <div className="space-y-8">
              {/* Header de la saisie */}
              <div className="powerbi-section">
                <div className="powerbi-section-header">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <FileText className="w-8 h-8 mr-3 text-blue-400" />
                    Saisie des Données Orthodontiques
                  </h3>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                    {selectedMonth} {selectedYear}
                  </Badge>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Interface moderne de saisie pour tous vos indicateurs orthodontiques. 
                  Saisissez facilement vos données mensuelles et visualisez l'impact en temps réel.
                </p>
              </div>

              {/* Formulaires de saisie organisés */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* Section Activité Principale */}
                <div className="powerbi-section">
                  <div className="powerbi-section-header">
                    <h4 className="text-xl font-semibold text-white flex items-center">
                      <Activity className="w-6 h-6 mr-2 text-green-400" />
                      Activité Principale
                    </h4>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-300 mb-2 block">Débuts de traitement</Label>
                        <Input
                          type="number"
                          value={currentData.metriques_activite.debuts_traitement || ''}
                          onChange={(e) => updateNestedData('metriques_activite', 'debuts_traitement', e.target.value)}
                          className="powerbi-input"
                          placeholder="Ex: 45"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 mb-2 block">Premières consultations</Label>
                        <Input
                          type="number"
                          value={currentData.metriques_activite.premieres_consultations || ''}
                          onChange={(e) => updateNestedData('metriques_activite', 'premieres_consultations', e.target.value)}
                          className="powerbi-input"
                          placeholder="Ex: 38"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 mb-2 block">Déposes</Label>
                        <Input
                          type="number"
                          value={currentData.metriques_activite.deposes || ''}
                          onChange={(e) => updateNestedData('metriques_activite', 'deposes', e.target.value)}
                          className="powerbi-input"
                          placeholder="Ex: 22"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 mb-2 block">Recettes du mois (€)</Label>
                        <Input
                          type="number"
                          value={currentData.metriques_activite.recettes_mois || ''}
                          onChange={(e) => updateNestedData('metriques_activite', 'recettes_mois', e.target.value)}
                          className="powerbi-input"
                          placeholder="Ex: 165000"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="text-white font-semibold mb-3 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-orange-400" />
                        Gestion des RDV
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300 mb-2 block">RDV Manqués</Label>
                          <Input
                            type="number"
                            value={currentData.metriques_activite.rdv_manques || ''}
                            onChange={(e) => updateNestedData('metriques_activite', 'rdv_manques', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 130"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300 mb-2 block">RDV Présents</Label>
                          <Input
                            type="number"
                            value={currentData.metriques_activite.rdv_presents || ''}
                            onChange={(e) => updateNestedData('metriques_activite', 'rdv_presents', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 895"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Consultations Spécialisées */}
                <div className="powerbi-section">
                  <div className="powerbi-section-header">
                    <h4 className="text-xl font-semibold text-white flex items-center">
                      <Users className="w-6 h-6 mr-2 text-purple-400" />
                      Consultations Spécialisées
                    </h4>
                  </div>
                  <div className="space-y-6">
                    
                    {/* CSE */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="text-white font-semibold mb-3 text-red-400">Consultations CSE</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300 mb-2 block">Nombre CSE</Label>
                          <Input
                            type="number"
                            value={currentData.consultations_cse.nombre_cse || ''}
                            onChange={(e) => updateNestedData('consultations_cse', 'nombre_cse', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 20"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300 mb-2 block">En traitement/attente</Label>
                          <Input
                            type="number"
                            value={currentData.consultations_cse.en_traitement_attente_cse || ''}
                            onChange={(e) => updateNestedData('consultations_cse', 'en_traitement_attente_cse', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 3"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Diagnostics Enfants */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="text-white font-semibold mb-3 text-green-400">Diagnostics Enfants</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300 mb-2 block">Nombre diagnostics</Label>
                          <Input
                            type="number"
                            value={currentData.diagnostics_enfants.nombre_diagnostics_enfants || ''}
                            onChange={(e) => updateNestedData('diagnostics_enfants', 'nombre_diagnostics_enfants', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 19"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300 mb-2 block">En traitement/attente</Label>
                          <Input
                            type="number"
                            value={currentData.diagnostics_enfants.en_traitement_attente_enfants || ''}
                            onChange={(e) => updateNestedData('diagnostics_enfants', 'en_traitement_attente_enfants', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 15"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CSA */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="text-white font-semibold mb-3 text-orange-400">Consultations CSA</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300 mb-2 block">Nombre CSA</Label>
                          <Input
                            type="number"
                            value={currentData.consultations_csa.nombre_csa || ''}
                            onChange={(e) => updateNestedData('consultations_csa', 'nombre_csa', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 17"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300 mb-2 block">En traitement/attente</Label>
                          <Input
                            type="number"
                            value={currentData.consultations_csa.en_traitement_attente_csa || ''}
                            onChange={(e) => updateNestedData('consultations_csa', 'en_traitement_attente_csa', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Ressources & Finances */}
                <div className="powerbi-section">
                  <div className="powerbi-section-header">
                    <h4 className="text-xl font-semibold text-white flex items-center">
                      <Euro className="w-6 h-6 mr-2 text-green-400" />
                      Ressources & Finances
                    </h4>
                  </div>
                  <div className="space-y-6">
                    
                    {/* Ressources Humaines */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="text-white font-semibold mb-3 flex items-center">
                        <UserCheck className="w-5 h-5 mr-2 text-blue-400" />
                        Ressources Humaines
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300 mb-2 block">Jours Dr Vergez</Label>
                          <Input
                            type="number"
                            value={currentData.ressources_humaines.jours_dr_vergez || ''}
                            onChange={(e) => updateNestedData('ressources_humaines', 'jours_dr_vergez', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 13"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300 mb-2 block">Jours Collaborateur</Label>
                          <Input
                            type="number"
                            value={currentData.ressources_humaines.jours_collaborateur || ''}
                            onChange={(e) => updateNestedData('ressources_humaines', 'jours_collaborateur', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 19"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Devis */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="text-white font-semibold mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-emerald-400" />
                        Devis Acceptés
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300 mb-2 block">Nombre de devis</Label>
                          <Input
                            type="number"
                            value={currentData.devis.nombre_devis_acceptes || ''}
                            onChange={(e) => updateNestedData('devis', 'nombre_devis_acceptes', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 23"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300 mb-2 block">Total devis (€)</Label>
                          <Input
                            type="number"
                            value={currentData.devis.total_devis_acceptes || ''}
                            onChange={(e) => updateNestedData('devis', 'total_devis_acceptes', e.target.value)}
                            className="powerbi-input"
                            placeholder="Ex: 120000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Aperçu & Actions */}
                <div className="powerbi-section">
                  <div className="powerbi-section-header">
                    <h4 className="text-xl font-semibold text-white flex items-center">
                      <Target className="w-6 h-6 mr-2 text-yellow-400" />
                      Aperçu & Actions
                    </h4>
                  </div>
                  <div className="space-y-6">
                    
                    {/* Aperçu rapide */}
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-400/30">
                      <h5 className="text-white font-semibold mb-4">Aperçu Période Actuelle</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Recettes:</span>
                          <span className="text-blue-400 font-semibold">{currentData.metriques_activite.recettes_mois?.toLocaleString('fr-FR') || '0'}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Débuts:</span>
                          <span className="text-green-400 font-semibold">{currentData.metriques_activite.debuts_traitement || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Consultations:</span>
                          <span className="text-purple-400 font-semibold">{currentData.metriques_activite.premieres_consultations || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">RDV Manqués:</span>
                          <span className="text-orange-400 font-semibold">{currentData.metriques_activite.rdv_manques || '0'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions de sauvegarde */}
                    <div className="space-y-4">
                      <Button
                        onClick={sauvegarderDonnees}
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 text-lg"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sauvegarde en cours...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Save className="w-5 h-5 mr-2" />
                            Sauvegarder & Analyser
                          </div>
                        )}
                      </Button>

                      <div className="text-center">
                        <p className="text-slate-400 text-sm">
                          Les données seront automatiquement analysées et les recommandations mises à jour
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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