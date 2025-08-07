import React, { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { Calendar, TrendingUp, TrendingDown, Users, Euro, FileText, AlertTriangle, CheckCircle, Info, Activity, Clock, Target, UserCheck } from 'lucide-react';

function App() {
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
        setMessage('Données sauvegardées avec succès !');
        await chargerTableaux();
        await chargerRecommandations();
        setActiveTab('dashboard');
      }
    } catch (error) {
      setMessage('Erreur lors de la sauvegarde: ' + error.message);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                SELARL Dr VERGEZ et Associés
              </h1>
              <p className="text-slate-600">Tableau de bord orthodontique - Suivi de performance mensuel</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-50">
                <Calendar className="w-4 h-4 mr-2" />
                {currentData.mois} {currentData.annee}
              </Badge>
            </div>
          </div>
        </header>

        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="saisie">Saisie</TabsTrigger>
            <TabsTrigger value="recommandations">Recommandations</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
            <TabsTrigger value="rectifications">Rectifications</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-white/90 backdrop-blur-sm border-l-4 border-l-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Recettes du mois</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.metriques_activite.recettes_mois.toLocaleString('fr-FR')}€
                    </p>
                  </div>
                  <Euro className="w-8 h-8 text-blue-600" />
                </div>
                <div className={`flex items-center text-sm px-2 py-1 rounded-full ${getEvolutionColor(currentData.comparaisons.recettes_evolution)}`}>
                  {getEvolutionIcon(currentData.comparaisons.recettes_evolution)}
                  <span className="ml-1">{currentData.comparaisons.recettes_evolution > 0 ? '+' : ''}{currentData.comparaisons.recettes_evolution}% vs N-1</span>
                </div>
              </Card>

              <Card className="p-6 bg-white/90 backdrop-blur-sm border-l-4 border-l-green-500">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Débuts de traitement</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.metriques_activite.debuts_traitement}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <div className={`flex items-center text-sm px-2 py-1 rounded-full ${getEvolutionColor(currentData.comparaisons.debuts_traitement_evolution)}`}>
                  {getEvolutionIcon(currentData.comparaisons.debuts_traitement_evolution)}
                  <span className="ml-1">{currentData.comparaisons.debuts_traitement_evolution > 0 ? '+' : ''}{currentData.comparaisons.debuts_traitement_evolution}% vs N-1</span>
                </div>
              </Card>

              <Card className="p-6 bg-white/90 backdrop-blur-sm border-l-4 border-l-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Premières consultations</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.metriques_activite.premieres_consultations}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className={`flex items-center text-sm px-2 py-1 rounded-full ${getEvolutionColor(currentData.comparaisons.consultations_evolution)}`}>
                  {getEvolutionIcon(currentData.comparaisons.consultations_evolution)}
                  <span className="ml-1">{currentData.comparaisons.consultations_evolution > 0 ? '+' : ''}{currentData.comparaisons.consultations_evolution}% vs N-1</span>
                </div>
              </Card>

              <Card className="p-6 bg-white/90 backdrop-blur-sm border-l-4 border-l-orange-500">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taux RDV manqués</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {calculerTauxRdvManques()}%
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <div className={`flex items-center text-sm px-2 py-1 rounded-full ${getEvolutionColor(currentData.comparaisons.rdv_manques_evolution)}`}>
                  {getEvolutionIcon(currentData.comparaisons.rdv_manques_evolution)}
                  <span className="ml-1">{currentData.comparaisons.rdv_manques_evolution > 0 ? '+' : ''}{currentData.comparaisons.rdv_manques_evolution}% vs N-1</span>
                </div>
              </Card>
            </div>

            {/* Détails des consultations et transformations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {/* Consultations CSE */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 text-blue-800">Consultations CSE</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre CSE:</span>
                    <span className="font-semibold">{currentData.consultations_cse.nombre_cse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">En traitement/attente:</span>
                    <span className="font-semibold">{currentData.consultations_cse.en_traitement_attente_cse}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taux de transformation:</span>
                    <Badge variant={currentData.consultations_cse.taux_transformation_cse < 20 ? 'destructive' : 'default'}>
                      {currentData.consultations_cse.taux_transformation_cse}%
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Diagnostics Enfants */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 text-green-800">Diagnostics Enfants</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diagnostics:</span>
                    <span className="font-semibold">{currentData.diagnostics_enfants.nombre_diagnostics_enfants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">En traitement/attente:</span>
                    <span className="font-semibold">{currentData.diagnostics_enfants.en_traitement_attente_enfants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taux de transformation:</span>
                    <Badge variant={currentData.diagnostics_enfants.taux_transformation_enfants > 70 ? 'default' : 'secondary'}>
                      {currentData.diagnostics_enfants.taux_transformation_enfants}%
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Consultations CSA */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 text-purple-800">Consultations CSA</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre CSA:</span>
                    <span className="font-semibold">{currentData.consultations_csa.nombre_csa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">En traitement/attente:</span>
                    <span className="font-semibold">{currentData.consultations_csa.en_traitement_attente_csa}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taux de transformation:</span>
                    <Badge variant={currentData.consultations_csa.taux_transformation_csa === 0 ? 'destructive' : 'default'}>
                      {currentData.consultations_csa.taux_transformation_csa}%
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Ressources Humaines et Devis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 text-indigo-800">Ressources Humaines</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jours collaborateur:</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{currentData.ressources_humaines.jours_collaborateur}</span>
                      <div className={`flex items-center text-xs px-2 py-1 rounded ${getEvolutionColor(currentData.comparaisons.jours_collaborateur_evolution)}`}>
                        {getEvolutionIcon(currentData.comparaisons.jours_collaborateur_evolution)}
                        <span className="ml-1">{currentData.comparaisons.jours_collaborateur_evolution > 0 ? '+' : ''}{currentData.comparaisons.jours_collaborateur_evolution}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jours Dr Vergez:</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{currentData.ressources_humaines.jours_dr_vergez}</span>
                      <div className={`flex items-center text-xs px-2 py-1 rounded ${getEvolutionColor(currentData.comparaisons.jours_vergez_evolution)}`}>
                        {getEvolutionIcon(currentData.comparaisons.jours_vergez_evolution)}
                        <span className="ml-1">{currentData.comparaisons.jours_vergez_evolution > 0 ? '+' : ''}{currentData.comparaisons.jours_vergez_evolution}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 text-emerald-800">Devis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total acceptés:</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{currentData.devis.total_devis_acceptes.toLocaleString('fr-FR')}€</span>
                      <div className={`flex items-center text-xs px-2 py-1 rounded ${getEvolutionColor(currentData.comparaisons.devis_evolution)}`}>
                        {getEvolutionIcon(currentData.comparaisons.devis_evolution)}
                        <span className="ml-1">{currentData.comparaisons.devis_evolution > 0 ? '+' : ''}{currentData.comparaisons.devis_evolution}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre acceptés:</span>
                    <span className="font-semibold">{currentData.devis.nombre_devis_acceptes}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saisie">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations générales */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Informations Générales</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mois">Mois</Label>
                    <Input
                      id="mois"
                      value={currentData.mois}
                      onChange={(e) => setCurrentData(prev => ({ ...prev, mois: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="annee">Année</Label>
                    <Input
                      id="annee"
                      type="number"
                      value={currentData.annee}
                      onChange={(e) => setCurrentData(prev => ({ ...prev, annee: parseInt(e.target.value) || 2025 }))}
                    />
                  </div>
                </div>
              </Card>

              {/* Métriques d'activité */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Métriques d'Activité</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="debuts_traitement">Débuts de traitement</Label>
                    <Input
                      id="debuts_traitement"
                      type="number"
                      value={currentData.metriques_activite.debuts_traitement}
                      onChange={(e) => updateNestedData('metriques_activite', 'debuts_traitement', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="premieres_consultations">Premières consultations</Label>
                    <Input
                      id="premieres_consultations"
                      type="number"
                      value={currentData.metriques_activite.premieres_consultations}
                      onChange={(e) => updateNestedData('metriques_activite', 'premieres_consultations', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deposes">Déposes</Label>
                    <Input
                      id="deposes"
                      type="number"
                      value={currentData.metriques_activite.deposes}
                      onChange={(e) => updateNestedData('metriques_activite', 'deposes', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recettes_mois">Recettes du mois (€)</Label>
                    <Input
                      id="recettes_mois"
                      type="number"
                      step="0.01"
                      value={currentData.metriques_activite.recettes_mois}
                      onChange={(e) => updateNestedData('metriques_activite', 'recettes_mois', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </Card>

              {/* Rendez-vous */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Rendez-vous</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rdv_manques">RDV manqués</Label>
                    <Input
                      id="rdv_manques"
                      type="number"
                      value={currentData.metriques_activite.rdv_manques}
                      onChange={(e) => updateNestedData('metriques_activite', 'rdv_manques', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rdv_presents">RDV présents</Label>
                    <Input
                      id="rdv_presents"
                      type="number"
                      value={currentData.metriques_activite.rdv_presents}
                      onChange={(e) => updateNestedData('metriques_activite', 'rdv_presents', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </Card>

              {/* Ressources Humaines */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Ressources Humaines</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jours_collaborateur">Jours collaborateur</Label>
                    <Input
                      id="jours_collaborateur"
                      type="number"
                      value={currentData.ressources_humaines.jours_collaborateur}
                      onChange={(e) => updateNestedData('ressources_humaines', 'jours_collaborateur', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jours_dr_vergez">Jours Dr Vergez</Label>
                    <Input
                      id="jours_dr_vergez"
                      type="number"
                      value={currentData.ressources_humaines.jours_dr_vergez}
                      onChange={(e) => updateNestedData('ressources_humaines', 'jours_dr_vergez', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </Card>

              {/* Consultations CSE */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Consultations CSE</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nombre_cse">Nombre CSE</Label>
                    <Input
                      id="nombre_cse"
                      type="number"
                      value={currentData.consultations_cse.nombre_cse}
                      onChange={(e) => updateNestedData('consultations_cse', 'nombre_cse', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="en_traitement_attente_cse">En traitement/attente CSE</Label>
                    <Input
                      id="en_traitement_attente_cse"
                      type="number"
                      value={currentData.consultations_cse.en_traitement_attente_cse}
                      onChange={(e) => updateNestedData('consultations_cse', 'en_traitement_attente_cse', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taux_transformation_cse">Taux transformation CSE (%)</Label>
                    <Input
                      id="taux_transformation_cse"
                      type="number"
                      step="0.1"
                      value={currentData.consultations_cse.taux_transformation_cse}
                      onChange={(e) => updateNestedData('consultations_cse', 'taux_transformation_cse', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </Card>

              {/* Diagnostics Enfants */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Diagnostics Enfants</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nombre_diagnostics_enfants">Nombre diagnostics enfants</Label>
                    <Input
                      id="nombre_diagnostics_enfants"
                      type="number"
                      value={currentData.diagnostics_enfants.nombre_diagnostics_enfants}
                      onChange={(e) => updateNestedData('diagnostics_enfants', 'nombre_diagnostics_enfants', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="en_traitement_attente_enfants">En traitement/attente enfants</Label>
                    <Input
                      id="en_traitement_attente_enfants"
                      type="number"
                      value={currentData.diagnostics_enfants.en_traitement_attente_enfants}
                      onChange={(e) => updateNestedData('diagnostics_enfants', 'en_traitement_attente_enfants', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taux_transformation_enfants">Taux transformation enfants (%)</Label>
                    <Input
                      id="taux_transformation_enfants"
                      type="number"
                      step="0.1"
                      value={currentData.diagnostics_enfants.taux_transformation_enfants}
                      onChange={(e) => updateNestedData('diagnostics_enfants', 'taux_transformation_enfants', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={sauvegarderDonnees}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
              >
                {loading ? 'Sauvegarde en cours...' : 'Sauvegarder les données'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="recommandations">
            <div className="space-y-6">
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Recommandations Automatiques</h3>
                <p className="text-gray-600 mb-6">
                  Analyse intelligente des performances et suggestions d'amélioration
                </p>
                
                {recommandations.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucune recommandation disponible pour le moment.</p>
                    <p className="text-sm text-gray-400">Saisissez des données pour obtenir des suggestions personnalisées.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommandations.map((reco, index) => (
                      <div
                        key={reco.id || index}
                        className={`p-4 rounded-lg border ${getRecommandationColor(reco.type)} transition-all duration-200 hover:shadow-md`}
                      >
                        <div className="flex items-start space-x-3">
                          {getRecommandationIcon(reco.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{reco.titre}</h4>
                              <Badge variant="outline" className="text-xs">
                                {reco.categorie}
                              </Badge>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {reco.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="historique">
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Historique des Tableaux de Bord</h3>
              
              {tableaux.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun tableau de bord sauvegardé.</p>
                  <p className="text-sm text-gray-400">Commencez par saisir des données.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Période</th>
                        <th className="text-left py-3 px-4 font-semibold">Recettes</th>
                        <th className="text-left py-3 px-4 font-semibold">Débuts traitement</th>
                        <th className="text-left py-3 px-4 font-semibold">Consultations</th>
                        <th className="text-left py-3 px-4 font-semibold">Taux transfo. enfants</th>
                        <th className="text-left py-3 px-4 font-semibold">Date création</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableaux.map((tableau, index) => (
                        <tr key={tableau.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="font-medium">{tableau.mois} {tableau.annee}</span>
                          </td>
                          <td className="py-3 px-4">
                            {tableau.metriques_activite.recettes_mois.toLocaleString('fr-FR')}€
                          </td>
                          <td className="py-3 px-4">
                            {tableau.metriques_activite.debuts_traitement}
                          </td>
                          <td className="py-3 px-4">
                            {tableau.metriques_activite.premieres_consultations}
                          </td>
                          <td className="py-3 px-4">
                            {tableau.diagnostics_enfants.taux_transformation_enfants}%
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {new Date(tableau.date_creation).toLocaleDateString('fr-FR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="rectifications">
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Rectifications de Recettes</h3>
              <p className="text-gray-600 mb-6">
                Suivi des corrections apportées aux recettes des mois précédents
              </p>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Rectifications connues :</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Janvier 2025:</span>
                    <span className="font-medium">166 000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Février 2025:</span>
                    <span className="font-medium">179 000€</span>
                  </div>
                </div>
              </div>

              {rectifications.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Période</th>
                        <th className="text-left py-3 px-4 font-semibold">Montant initial</th>
                        <th className="text-left py-3 px-4 font-semibold">Montant rectifié</th>
                        <th className="text-left py-3 px-4 font-semibold">Raison</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rectifications.map((rect, index) => (
                        <tr key={rect.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="font-medium">{rect.mois} {rect.annee}</span>
                          </td>
                          <td className="py-3 px-4">
                            {rect.montant_initial.toLocaleString('fr-FR')}€
                          </td>
                          <td className="py-3 px-4">
                            {rect.montant_rectifie.toLocaleString('fr-FR')}€
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {rect.raison}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {new Date(rect.date_rectification).toLocaleDateString('fr-FR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;