import requests
import sys
import json
from datetime import datetime

class DrVergezDashboardAPITester:
    def __init__(self, base_url="https://7dafaea7-da3e-4138-8969-29ffeb8c5830.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.created_tableau_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:300]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test health check endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_create_tableau_bord_vergez(self):
        """Test creating a new tableau de bord vergez with May 2025 data"""
        test_data = {
            "mois": "mai",
            "annee": 2025,
            "metriques_activite": {
                "debuts_traitement": 41,
                "premieres_consultations": 37,
                "deposes": 22,
                "recettes_mois": 167000.0,
                "rdv_manques": 131,
                "rdv_presents": 900
            },
            "ressources_humaines": {
                "jours_collaborateur": 19,
                "jours_dr_vergez": 13
            },
            "consultations_cse": {
                "nombre_cse": 20,
                "en_traitement_attente_cse": 3,
                "taux_transformation_cse": 15.0
            },
            "diagnostics_enfants": {
                "nombre_diagnostics_enfants": 19,
                "en_traitement_attente_enfants": 15,
                "taux_transformation_enfants": 79.0
            },
            "consultations_csa": {
                "nombre_csa": 17,
                "en_traitement_attente_csa": 0,
                "taux_transformation_csa": 0.0
            },
            "devis": {
                "total_devis_acceptes": 120000.0,
                "nombre_devis_acceptes": 23
            },
            "comparaisons": {
                "debuts_traitement_evolution": 37.0,
                "consultations_evolution": -3.0,
                "deposes_evolution": -12.0,
                "recettes_evolution": 1.0,
                "rdv_manques_evolution": 9.0,
                "rdv_presents_evolution": 12.0,
                "jours_collaborateur_evolution": 6.0,
                "jours_vergez_evolution": 30.0,
                "cse_evolution": 33.0,
                "diagnostics_enfants_evolution": -5.0,
                "csa_evolution": -26.0,
                "devis_evolution": -26.0
            }
        }
        
        success, response = self.run_test("Create Tableau de Bord Vergez", "POST", "api/tableau-bord-vergez", 200, test_data)
        if success and 'id' in response:
            self.created_tableau_id = response['id']
            print(f"   Created tableau ID: {self.created_tableau_id}")
        return success

    def test_get_tableaux_bord_vergez(self):
        """Test getting list of tableaux de bord vergez"""
        return self.run_test("Get Tableaux de Bord Vergez List", "GET", "api/tableau-bord-vergez", 200)

    def test_get_single_tableau_bord_vergez(self):
        """Test getting a single tableau de bord vergez by ID"""
        if not self.created_tableau_id:
            print("❌ Skipping single tableau test - no ID available")
            return False
        
        return self.run_test(
            "Get Single Tableau de Bord Vergez", 
            "GET", 
            f"api/tableau-bord-vergez/{self.created_tableau_id}", 
            200
        )

    def test_update_tableau_bord_vergez(self):
        """Test updating a tableau de bord vergez"""
        if not self.created_tableau_id:
            print("❌ Skipping update test - no ID available")
            return False
            
        update_data = {
            "mois": "mai",
            "annee": 2025,
            "metriques_activite": {
                "debuts_traitement": 45,  # Updated value
                "premieres_consultations": 40,  # Updated value
                "deposes": 22,
                "recettes_mois": 170000.0,  # Updated value
                "rdv_manques": 131,
                "rdv_presents": 900
            },
            "ressources_humaines": {
                "jours_collaborateur": 19,
                "jours_dr_vergez": 13
            },
            "consultations_cse": {
                "nombre_cse": 20,
                "en_traitement_attente_cse": 3,
                "taux_transformation_cse": 15.0
            },
            "diagnostics_enfants": {
                "nombre_diagnostics_enfants": 19,
                "en_traitement_attente_enfants": 15,
                "taux_transformation_enfants": 79.0
            },
            "consultations_csa": {
                "nombre_csa": 17,
                "en_traitement_attente_csa": 0,
                "taux_transformation_csa": 0.0
            },
            "devis": {
                "total_devis_acceptes": 120000.0,
                "nombre_devis_acceptes": 23
            },
            "comparaisons": {
                "debuts_traitement_evolution": 37.0,
                "consultations_evolution": -3.0,
                "deposes_evolution": -12.0,
                "recettes_evolution": 1.0,
                "rdv_manques_evolution": 9.0,
                "rdv_presents_evolution": 12.0,
                "jours_collaborateur_evolution": 6.0,
                "jours_vergez_evolution": 30.0,
                "cse_evolution": 33.0,
                "diagnostics_enfants_evolution": -5.0,
                "csa_evolution": -26.0,
                "devis_evolution": -26.0
            }
        }
        
        return self.run_test(
            "Update Tableau de Bord Vergez", 
            "PUT", 
            f"api/tableau-bord-vergez/{self.created_tableau_id}", 
            200, 
            update_data
        )

    def test_get_recommandations_vergez(self):
        """Test getting recommendations vergez"""
        return self.run_test("Get Recommandations Vergez", "GET", "api/recommandations-vergez", 200)

    def test_get_statistiques_vergez(self):
        """Test getting statistics vergez"""
        return self.run_test("Get Statistiques Vergez", "GET", "api/statistiques-vergez", 200)

    def test_create_rectification_recettes(self):
        """Test creating a rectification de recettes"""
        rectification_data = {
            "mois": "avril",
            "annee": 2025,
            "montant_initial": 150000.0,
            "montant_rectifie": 155000.0,
            "raison": "Ajustement suite à encaissement tardif"
        }
        
        return self.run_test("Create Rectification Recettes", "POST", "api/rectifications-recettes", 200, rectification_data)

    def test_get_rectifications_recettes(self):
        """Test getting rectifications de recettes"""
        return self.run_test("Get Rectifications Recettes", "GET", "api/rectifications-recettes", 200)

    def test_delete_tableau_bord_vergez(self):
        """Test deleting a tableau de bord vergez"""
        if not self.created_tableau_id:
            print("❌ Skipping delete test - no ID available")
            return False
            
        return self.run_test(
            "Delete Tableau de Bord Vergez", 
            "DELETE", 
            f"api/tableau-bord-vergez/{self.created_tableau_id}", 
            200
        )

    def test_error_cases(self):
        """Test error handling"""
        print("\n🔍 Testing Error Cases...")
        
        # Test getting non-existent tableau
        success1, _ = self.run_test(
            "Get Non-existent Tableau Vergez", 
            "GET", 
            "api/tableau-bord-vergez/non-existent-id", 
            404
        )
        
        # Test updating non-existent tableau
        success2, _ = self.run_test(
            "Update Non-existent Tableau Vergez", 
            "PUT", 
            "api/tableau-bord-vergez/non-existent-id", 
            404,
            {"mois": "test", "annee": 2024}
        )
        
        # Test deleting non-existent tableau
        success3, _ = self.run_test(
            "Delete Non-existent Tableau Vergez", 
            "DELETE", 
            "api/tableau-bord-vergez/non-existent-id", 
            404
        )
        
        return success1 and success2 and success3

def main():
    print("🏥 Testing Dr Vergez Orthodontic Dashboard API")
    print("=" * 60)
    
    tester = DrVergezDashboardAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_endpoint,
        tester.test_create_tableau_bord_vergez,
        tester.test_get_tableaux_bord_vergez,
        tester.test_get_single_tableau_bord_vergez,
        tester.test_update_tableau_bord_vergez,
        tester.test_get_recommandations_vergez,
        tester.test_get_statistiques_vergez,
        tester.test_create_rectification_recettes,
        tester.test_get_rectifications_recettes,
        tester.test_error_cases,
        tester.test_delete_tableau_bord_vergez,  # Delete at the end
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())