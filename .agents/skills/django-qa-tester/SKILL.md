---
name: django-qa-tester
description: Écrit et exécute les suites de tests unitaires, d'intégration, de performance ORM et de concurrence pour Django (TestCase, TransactionTestCase, comptage de requêtes). À activer pour valider les comportements ou concevoir les tests préalables.
---

# Compétence : Django QA & Test Architect

Cette compétence garantit la fiabilité sans faille de l'application « Les Bons Comptes » et fournit les tests de validation automatique pour les étudiants du TP.

## Directives d'Exécution

1. **Tests Unitaires & Règles Métier** :
   - Tester l'intégrité des modèles et des validateurs de formulaires.
   - Vérifier les règles de permissions : interdiction de supprimer une dépense si l'utilisateur n'est ni le payeur ni le créateur du pot.
2. **Tests de Concurrence & Transactions (Exercice clé du TP)** :
   - Rédiger des tests utilisant `TransactionTestCase` avec threads concurrents pour simuler des requêtes simultanées et valider le verrouillage atomique (`select_for_update` / `transaction.atomic`).
3. **Tests de Performance ORM (Think HUGE)** :
   - Utiliser `self.assertNumQueries(N)` pour certifier que l'affichage d'un pot contenant 100 dépenses s'effectue en un nombre fixe et minimal de requêtes SQL (ex: 2 ou 3 requêtes maximum, quel que soit le nombre de dépenses).
