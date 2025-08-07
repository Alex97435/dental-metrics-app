import React, { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { Calendar, TrendingUp, TrendingDown, Users, Euro, FileText, AlertTriangle, CheckCircle, Info } from 'lucide-react';

function App() {
  const [currentData, setCurrentData] = useState({
    mois: 'juin',
    annee: 2024,
    dossiers_inactifs: {
      nouveaux_cas: 2846,
      consultants_attente: 4335,
      en_attente: 18,
      abandons: 1867,
      demenagements: 562,
      soins_termines: 10,
      traitements_finis: 3366,
      repris_archives: 95,
      interruptions: 0
    },
    dossiers_actifs: {
      phase_1: 703,
      phase_2: 79,
      phase_3: 3,
      pause: 18,
      pause_1: 1,
      pause_2: 0,
      pause_3: 0,
      contentions: 140
    },
    activite: {
      premieres_consultations: 36,
      compte_rendus: 0,
      debuts_traitement: 32,
      poses_amovibles: 0,
      poses_fixes: 0,
      abandons_departs: 28
    },
    recettes: {
      especes: 7977.30,
      cheques: 7203.30,
      cartes_bancaires: 102786.71,
      virements: 33189.18,
      prelevements: 11179.50
    },
    actes: {
      cs: { coefficient: 0.00, montant: 0, nombre: 0 },
      csd: { coefficient: 28.00, montant: 772.80, nombre: 28 },
      hn: { coefficient: 63.00, montant: 72341.90, nombre: 63 },
      to: { coefficient: 7800.00, montant: 88105.84, nombre: 224 },
      z: { coefficient: 2220.00, montant: 3319.56, nombre: 148 }
    }
  });

  const [tableaux, setTableaux] = useState([]);
  const [recommandations, setRecommandations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    chargerTableaux();
    chargerRecommandations();
  }, []);

  const chargerTableaux = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/tableau-bord`);
      const data = await response.json();
      setTableaux(data.tableaux || []);
    } catch (error) {
      console.error('Erreur chargement tableaux:', error);
    }
  };

  const chargerRecommandations = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/recommandations`);
      const data = await response.json();
      setRecommandations(data.recommandations || []);
    } catch (error) {
      console.error('Erreur chargement recommandations:', error);
    }
  };

  const sauvegarderDonnees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/tableau-bord`, {
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

  const calculerTotalRecettes = () => {
    const { especes, cheques, cartes_bancaires, virements, prelevements } = currentData.recettes;
    return especes + cheques + cartes_bancaires + virements + prelevements;
  };

  const calculerTotalDossiersActifs = () => {
    const { phase_1, phase_2, phase_3 } = currentData.dossiers_actifs;
    return phase_1 + phase_2 + phase_3;
  };

  const calculerTotalDossiersInactifs = () => {
    const { nouveaux_cas, consultants_attente, en_attente, abandons, demenagements, soins_termines, traitements_finis, repris_archives, interruptions } = currentData.dossiers_inactifs;
    return nouveaux_cas + consultants_attente + en_attente + abandons + demenagements + soins_termines + traitements_finis + repris_archives + interruptions;
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

  const updateActeData = (acte, field, value) => {
    setCurrentData(prev => ({
      ...prev,
      actes: {
        ...prev.actes,
        [acte]: {
          ...prev.actes[acte],
          [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
        }
      }
    }));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Cabinet Du Docteur Vergez et Associés
              </h1>
              <p className="text-slate-600">Tableau de bord orthodontique - Suivi d'activité</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-lg px-4 py-2">
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
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="saisie">Saisie des données</TabsTrigger>
            <TabsTrigger value="recommandations">Recommandations</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Métriques principales */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Recettes totales</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {calculerTotalRecettes().toLocaleString('fr-FR')}€
                    </p>
                  </div>
                  <Euro className="w-8 h-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dossiers actifs</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {calculerTotalDossiersActifs()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Consultations</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.activite.premieres_consultations}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total dossiers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {calculerTotalDossiersActifs() + calculerTotalDossiersInactifs()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tableau des dossiers */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Gestion des Dossiers</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Dossiers Inactifs</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Nouveaux cas: <span className="font-medium">{currentData.dossiers_inactifs.nouveaux_cas}</span></div>
                      <div>En attente: <span className="font-medium">{currentData.dossiers_inactifs.en_attente}</span></div>
                      <div>Consultants: <span className="font-medium">{currentData.dossiers_inactifs.consultants_attente}</span></div>
                      <div>Abandons: <span className="font-medium">{currentData.dossiers_inactifs.abandons}</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Dossiers Actifs</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Phase 1: <span className="font-medium">{currentData.dossiers_actifs.phase_1}</span></div>
                      <div>Phase 2: <span className="font-medium">{currentData.dossiers_actifs.phase_2}</span></div>
                      <div>Phase 3: <span className="font-medium">{currentData.dossiers_actifs.phase_3}</span></div>
                      <div>Contentions: <span className="font-medium">{currentData.dossiers_actifs.contentions}</span></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tableau des recettes */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Recettes par Mode de Paiement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Espèces:</span>
                    <span className="font-medium">{currentData.recettes.especes.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chèques:</span>
                    <span className="font-medium">{currentData.recettes.cheques.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cartes bancaires:</span>
                    <span className="font-medium">{currentData.recettes.cartes_bancaires.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Virements:</span>
                    <span className="font-medium">{currentData.recettes.virements.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prélèvements:</span>
                    <span className="font-medium">{currentData.recettes.prelevements.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{calculerTotalRecettes().toLocaleString('fr-FR')}€</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saisie">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations générales */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
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
                      onChange={(e) => setCurrentData(prev => ({ ...prev, annee: parseInt(e.target.value) || 2024 }))}
                    />
                  </div>
                </div>
              </Card>

              {/* Activité mensuelle */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Activité Mensuelle</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="premieres_consultations">Premières consultations</Label>
                    <Input
                      id="premieres_consultations"
                      type="number"
                      value={currentData.activite.premieres_consultations}
                      onChange={(e) => updateNestedData('activite', 'premieres_consultations', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="debuts_traitement">Débuts de traitement</Label>
                    <Input
                      id="debuts_traitement"
                      type="number"
                      value={currentData.activite.debuts_traitement}
                      onChange={(e) => updateNestedData('activite', 'debuts_traitement', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="abandons_departs">Abandons ou départs</Label>
                    <Input
                      id="abandons_departs"
                      type="number"
                      value={currentData.activite.abandons_departs}
                      onChange={(e) => updateNestedData('activite', 'abandons_departs', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </Card>

              {/* Recettes */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Recettes</h3>
                <div className="space-y-4">
                  {Object.entries(currentData.recettes).map(([key, value]) => (
                    <div key={key}>
                      <Label htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                      </Label>
                      <Input
                        id={key}
                        type="number"
                        step="0.01"
                        value={value}
                        onChange={(e) => updateNestedData('recettes', key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Dossiers Actifs */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Dossiers Actifs</h3>
                <div className="space-y-4">
                  {Object.entries(currentData.dossiers_actifs).map(([key, value]) => (
                    <div key={key}>
                      <Label htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                      </Label>
                      <Input
                        id={key}
                        type="number"
                        value={value}
                        onChange={(e) => updateNestedData('dossiers_actifs', key, parseInt(e.target.value) || 0)}
                      />
                    </div>
                  ))}
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
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Recommandations Automatiques</h3>
                <p className="text-gray-600 mb-6">
                  Basées sur l'analyse de vos données d'activité et recettes
                </p>
                
                {recommandations.length === 0 ? (
                  <div className="text-center py-8">
                    <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
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
                        <th className="text-left py-3 px-4 font-semibold">Recettes totales</th>
                        <th className="text-left py-3 px-4 font-semibold">Consultations</th>
                        <th className="text-left py-3 px-4 font-semibold">Dossiers actifs</th>
                        <th className="text-left py-3 px-4 font-semibold">Date création</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableaux.map((tableau, index) => {
                        const totalRecettes = tableau.recettes.especes + tableau.recettes.cheques + 
                                            tableau.recettes.cartes_bancaires + tableau.recettes.virements + 
                                            tableau.recettes.prelevements;
                        const totalActifs = tableau.dossiers_actifs.phase_1 + tableau.dossiers_actifs.phase_2 + 
                                          tableau.dossiers_actifs.phase_3;
                        
                        return (
                          <tr key={tableau.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <span className="font-medium">{tableau.mois} {tableau.annee}</span>
                            </td>
                            <td className="py-3 px-4">
                              {totalRecettes.toLocaleString('fr-FR')}€
                            </td>
                            <td className="py-3 px-4">
                              {tableau.activite.premieres_consultations}
                            </td>
                            <td className="py-3 px-4">
                              {totalActifs}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500">
                              {new Date(tableau.date_creation).toLocaleDateString('fr-FR')}
                            </td>
                          </tr>
                        );
                      })}
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