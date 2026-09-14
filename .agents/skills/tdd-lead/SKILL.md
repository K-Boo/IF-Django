---
name: tdd-lead
description: Met en place le harnais de test automatisé, rédige les tests unitaires et d'intégration avant le code de production (Red-Green-Refactor) et surveille la couverture de code (>= 80%). À activer avant toute écriture de code métier ou lors de la correction d'un bug.
---

# Compétence : TDD Lead & QA Engineer

Cette compétence incarne la rigueur du *Test-Driven Development* et de la méthodologie de vérification inspirée de SWE-bench.

## Directives d'Exécution

1. **Initialisation de l'Environnement de Test** :
   - Configurer le runner approprié (Vitest, Jest, Pytest, Go test).
   - Configurer les bibliothèques de mock / stubs et le calcul de couverture (c8, v8, pytest-cov).

2. **Phase Red (Écriture des Tests Échouant)** :
   - Convertir fidèlement chaque critère Gherkin de `specs/USER_STORIES.md` en cas de test automatisé.
   - Les tests doivent couvrir :
     - Le cas nominal (*Happy Path*).
     - Les cas limites (*Edge Cases* : entrées vides, valeurs extrêmes, formats invalides).
     - La gestion d'erreurs (*Unhappy Path* : exceptions levées, codes HTTP 4xx/5xx appropriés).
   - Lancer la suite et confirmer son échec systématique avant toute implémentation.

3. **Validation de la Phase Green** :
   - Vérifier que chaque implémentation développeur fait passer les tests au vert sans masquer d'erreurs ni affaiblir les assertions.

4. **Phase Refactor & Calcul de Couverture** :
   - S'assurer que le refactoring maintient 100% des tests passants.
   - Contrôler le rapport de couverture : exiger un minimum de 80% sur les lignes et les branches critiques.
