import requests
import sys
import json
from datetime import datetime

class OrthodonticDashboardAPITester:
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
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
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

    def test_create_tableau_bord(self):
        """Test creating a new tableau de bord"""
        test_data = {
            "mois": "juillet",
            "annee": 2024,
            "dossiers_inactifs": {
                "nouveaux_cas": 100,
                "consultants_attente": 200,
                "en_attente": 10,
                "abandons": 50,
                "demenagements": 20,
                "soins_termines": 5,
                "traitements_finis": 150,
                "repris_archives": 10,
                "interruptions": 2
            },
            "dossiers_actifs": {
                "phase_1": 300,
                "phase_2": 50,
                "phase_3": 10,
                "pause": 15,
                "pause_1": 5,
                "pause_2": 2,
                "pause_3": 1,
                "contentions": 80
            },
            "activite": {
                "premieres_consultations": 45,
                "compte_rendus": 10,
                "debuts_traitement": 35,
                "poses_amovibles": 5,
                "poses_fixes": 8,
                "abandons_departs": 25
            },
            "recettes": {
                "especes": 5000.50,
                "cheques": 8000.75,
                "cartes_bancaires": 120000.00,
                "virements": 40000.25,
                "prelevements": 15000.00
            },
            "actes": {
                "cs": {"coefficient": 10.0, "montant": 500.0, "nombre": 10},
                "csd": {"coefficient": 30.0, "montant": 800.0, "nombre": 30},
                "hn": {"coefficient": 65.0, "montant": 75000.0, "nombre": 65},
                "to": {"coefficient": 8000.0, "montant": 90000.0, "nombre": 250},
                "z": {"coefficient": 2500.0, "montant": 3500.0, "nombre": 160}
            }
        }
        
        success, response = self.run_test("Create Tableau de Bord", "POST", "api/tableau-bord", 200, test_data)
        if success and 'id' in response:
            self.created_tableau_id = response['id']
            print(f"   Created tableau ID: {self.created_tableau_id}")
        return success

    def test_get_tableaux_bord(self):
        """Test getting list of tableaux de bord"""
        return self.run_test("Get Tableaux de Bord List", "GET", "api/tableau-bord", 200)

    def test_get_single_tableau_bord(self):
        """Test getting a single tableau de bord by ID"""
        if not self.created_tableau_id:
            print("❌ Skipping single tableau test - no ID available")
            return False
        
        return self.run_test(
            "Get Single Tableau de Bord", 
            "GET", 
            f"api/tableau-bord/{self.created_tableau_id}", 
            200
        )

    def test_update_tableau_bord(self):
        """Test updating a tableau de bord"""
        if not self.created_tableau_id:
            print("❌ Skipping update test - no ID available")
            return False
            
        update_data = {
            "mois": "juillet",
            "annee": 2024,
            "dossiers_inactifs": {
                "nouveaux_cas": 110,  # Updated value
                "consultants_attente": 200,
                "en_attente": 10,
                "abandons": 50,
                "demenagements": 20,
                "soins_termines": 5,
                "traitements_finis": 150,
                "repris_archives": 10,
                "interruptions": 2
            },
            "dossiers_actifs": {
                "phase_1": 300,
                "phase_2": 50,
                "phase_3": 10,
                "pause": 15,
                "pause_1": 5,
                "pause_2": 2,
                "pause_3": 1,
                "contentions": 80
            },
            "activite": {
                "premieres_consultations": 50,  # Updated value
                "compte_rendus": 10,
                "debuts_traitement": 35,
                "poses_amovibles": 5,
                "poses_fixes": 8,
                "abandons_departs": 25
            },
            "recettes": {
                "especes": 5500.50,  # Updated value
                "cheques": 8000.75,
                "cartes_bancaires": 120000.00,
                "virements": 40000.25,
                "prelevements": 15000.00
            },
            "actes": {
                "cs": {"coefficient": 10.0, "montant": 500.0, "nombre": 10},
                "csd": {"coefficient": 30.0, "montant": 800.0, "nombre": 30},
                "hn": {"coefficient": 65.0, "montant": 75000.0, "nombre": 65},
                "to": {"coefficient": 8000.0, "montant": 90000.0, "nombre": 250},
                "z": {"coefficient": 2500.0, "montant": 3500.0, "nombre": 160}
            }
        }
        
        return self.run_test(
            "Update Tableau de Bord", 
            "PUT", 
            f"api/tableau-bord/{self.created_tableau_id}", 
            200, 
            update_data
        )

    def test_get_recommandations(self):
        """Test getting recommendations"""
        return self.run_test("Get Recommandations", "GET", "api/recommandations", 200)

    def test_get_statistiques(self):
        """Test getting statistics"""
        return self.run_test("Get Statistiques", "GET", "api/statistiques", 200)

    def test_delete_tableau_bord(self):
        """Test deleting a tableau de bord"""
        if not self.created_tableau_id:
            print("❌ Skipping delete test - no ID available")
            return False
            
        return self.run_test(
            "Delete Tableau de Bord", 
            "DELETE", 
            f"api/tableau-bord/{self.created_tableau_id}", 
            200
        )

    def test_error_cases(self):
        """Test error handling"""
        print("\n🔍 Testing Error Cases...")
        
        # Test getting non-existent tableau
        success1, _ = self.run_test(
            "Get Non-existent Tableau", 
            "GET", 
            "api/tableau-bord/non-existent-id", 
            404
        )
        
        # Test updating non-existent tableau
        success2, _ = self.run_test(
            "Update Non-existent Tableau", 
            "PUT", 
            "api/tableau-bord/non-existent-id", 
            404,
            {"mois": "test", "annee": 2024}
        )
        
        # Test deleting non-existent tableau
        success3, _ = self.run_test(
            "Delete Non-existent Tableau", 
            "DELETE", 
            "api/tableau-bord/non-existent-id", 
            404
        )
        
        return success1 and success2 and success3

def main():
    print("🏥 Testing Orthodontic Dashboard API")
    print("=" * 50)
    
    tester = OrthodonticDashboardAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_endpoint,
        tester.test_create_tableau_bord,
        tester.test_get_tableaux_bord,
        tester.test_get_single_tableau_bord,
        tester.test_update_tableau_bord,
        tester.test_get_recommandations,
        tester.test_get_statistiques,
        tester.test_error_cases,
        tester.test_delete_tableau_bord,  # Delete at the end
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())