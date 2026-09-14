---
name: factory-orchestrator
description: Coordonne le cycle complet de développement d'un projet applicatif au sein de la Code Factory en orchestrant l'équipe d'agents virtuels (Spec -> Arch -> TDD -> Dev -> Review -> Deploy). À activer lorsqu'un utilisateur souhaite initier ou piloter un projet ou une feature de bout en bout.
---

# Compétence : Factory Orchestrator

Cette compétence permet de superviser l'ensemble de la chaîne de valeur du développement logiciel en coordonnant les différents agents spécialisés de la Code Factory.

## Procédure d'Orchestration

1. **Initialisation et Cadrage** :
   - Analyser le projet demandé par l'utilisateur.
   - Si le projet n'existe pas, initialiser son dossier sous `projects/<nom_projet>/`.
   - Déléguer la phase de spécification à la compétence `spec-architect`.

2. **Validation des Spécifications & Architecture** :
   - Attendre la validation formelle des spécifications (`specs/SPEC.md`).
   - Déléguer la phase d'architecture et de sélection de stack à `tech-architect`.
   - Vérifier la présence des ADRs et des contrats d'API.

3. **Phase TDD Préalable (Red)** :
   - Déléguer à `tdd-lead` l'écriture des tests automatisés (unitaires/intégration) basés sur les critères Gherkin.
   - S'assurer que les tests échouent avant tout développement métier.

4. **Phase d'Implémentation (Green)** :
   - Déclencher les sous-agents développeurs (`backend-dev` / `frontend-dev`).
   - Surveiller l'avancement jusqu'à ce que tous les tests passent au vert.

5. **Phase de Contrôle et d'Audit (Evaluator Gate)** :
   - Invoquer `code-reviewer` pour auditer le code (OWASP, Clean Code, couverture >= 80%).
   - Si refus : réinjecter le rapport d'anomalie aux développeurs (boucle Evaluator-Optimizer, max 3 itérations).
   - Si succès : autoriser l'étape finale.

6. **Phase de Déploiement & Clôture** :
   - Déléguer à `devops-deployer` la conteneurisation (Dockerfile, docker-compose) et la CI/CD.
   - Produire le rapport final et le `walkthrough.md` pour l'utilisateur.
