# WORKFLOW : ITÉRATION DE SPRINT ET DÉVELOPPEMENT DE FEATURE

Ce workflow régit l'ajout d'une nouvelle fonctionnalité, l'optimisation ou la résolution de bugs sur un projet existant déjà géré par la Code Factory.

---

## Les 5 Phases de l'Itération

### Phase 1 : Définition & Découpage de la Tâche (Task Breakdown)
1. L'Orchestrateur reçoit la demande de feature ou le ticket de bug.
2. Le **Product Owner** met à jour `specs/SPEC.md` et crée la fiche de feature avec ses critères Gherkin :
   ```gherkin
   Scenario: Connexion sécurisée avec double facteur
     Given un utilisateur existant avec 2FA activé
     When il soumet des identifiants valides et un token TOTP expiré
     Then la requête est rejetée avec le code HTTP 401 et un message d'erreur explicite
   ```
3. L'Orchestrateur crée une branche ou un git worktree dédié : `git checkout -b feat/<nom-feature>`.

### Phase 2 : Rédaction des Tests Spécifiques (TDD Red)
1. Le **TDD Lead** génère les tests de non-régression et les tests unitaires / d'intégration correspondants aux nouveaux critères Gherkin.
2. Exécution : confirmation que les nouveaux tests échouent.

### Phase 3 : Développement & Intégration (Devs Green)
1. Le **Backend Dev** / **Frontend Dev** implémente la fonctionnalité minimale requise.
2. Exécution du harnais de test local :
   - `npm test` ou `pytest`
3. Vérification que les anciens tests ET les nouveaux tests passent au vert à 100%.

### Phase 4 : Boucle d'Évaluation & Sécurité (Evaluator Gate)
1. Le **Code Reviewer** inspecte le diff git (`git diff origin/main...HEAD`).
2. Grille d'évaluation :
   - Architecture respectée ? Pas de couplage parasite ?
   - Zéro `any` ou types lâches ?
   - Données d'entrée validées avec Zod/Pydantic ?
   - Gestion d'erreurs exhaustive (pas de promesses non rattrapées, pas de panic non géré) ?
   - Documentation de code claire et commentaires essentiels conservés ?
3. Si rejet : boucle corrective immédiate avec consignes explicites.
4. Si validation : émission du rapport d'approbation.

### Phase 5 : Merge, Documentation & Notification
1. L'Orchestrateur met à jour la documentation (`CHANGELOG.md`, `ROADMAP.md`).
2. Merge propre de la branche vers `main` avec Conventional Commit.
3. Rapport synthétique délivré à l'utilisateur.
