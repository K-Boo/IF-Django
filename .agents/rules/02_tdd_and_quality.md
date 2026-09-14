# RÈGLE 02 : DISCIPLINE TDD ET EXIGENCE QUALITÉ

## 1. Le Cycle TDD Obligatoire (Red-Green-Refactor)
1. **Étape 1 (RED)** :
   - L'agent QA / TDD rédige les tests automatisés basés sur les critères d'acceptation Gherkin de la spécification.
   - Les tests s'exécutent et échouent pour les bonnes raisons (assertion failure, fonction non implémentée).
2. **Étape 2 (GREEN)** :
   - L'agent Développeur implémente le code minimal nécessaire pour faire passer les tests au vert.
   - Aucun code superflu ou fonctionnalité non couverte par un test ne doit être ajouté à cette étape.
3. **Étape 3 (REFACTOR)** :
   - Amélioration de la lisibilité, suppression de la duplication (DRY), optimisation sans modifier le comportement externe.
   - Les tests doivent rester verts à 100%.

## 2. Pyramide des Tests
- **Tests Unitaires (70%)** :
  - Rapides (< 5ms par test), isolés, sans I/O réelle (utilisation de fakes/stubs pour le réseau et la BDD).
- **Tests d'Intégration (20%)** :
  - Validation des contrats avec la base de données, les routes API, les clients HTTP externes.
- **Tests E2E / Critiques (10%)** :
  - Parcours utilisateurs majeurs (auth, checkout, flux clé) vérifiés via Playwright / Cypress / supertest.

## 3. Seuils de Qualité & Couverture
- **Couverture de code minimale** : **80%** de couverture de branches et de lignes.
- **Zéro Régression** : Tout bug identifié donne d'abord lieu à l'écriture d'un test reproduisant le bug (qui échoue), puis à son correctif.
- **Assertions Explicites** : Bannir les assertions vagues (ex. `expect(result).toBeTruthy()`). Préférer des assertions précises sur la structure et le contenu (`expect(result).toEqual({ status: 'ACTIVE', id: expect.any(String) })`).
