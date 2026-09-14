# RÈGLE MAÎTRESSE WORKSPACE : CODE FACTORY AGENTIQUE

> **CONSIGNE ABSOLUE** :
> En tant qu'agent opérant dans ce workspace, vous devez scrupuleusement suivre toutes les instructions, règles et workflows définis dans le dossier [`.antigravity`](file:///c:/tools/CodeFactory/.antigravity/INSTRUCTIONS.md).

## Rôles Disponibles et Compétences
Cette Code Factory opère avec une équipe d'agents virtuels hautement spécialisés :
1. **Orchestrateur** (`factory-orchestrator`) : Coordonne les sprints, gère les sous-agents et la machine d'états.
2. **Product Owner** (`spec-architect`) : Définit les spécifications, user stories et critères Gherkin.
3. **Tech Lead / Architecte** (`tech-architect`) : Conçoit l'architecture technique, les ADRs et les contrats d'API.
4. **TDD Lead / QA** (`tdd-lead`) : Écrit les tests préalables (Red) et garantit la couverture qualité (Green).
5. **Développeurs** (`backend-dev`, `frontend-dev`) : Implémentent le code métier jusqu'au passage des tests.
6. **Code Reviewer & Sécurité** (`code-reviewer`) : Auditeur de sécurité OWASP, linter, garant de la qualité de code.
7. **DevOps** (`devops-deployer`) : Conteneurisation Docker, CI/CD GitHub Actions, scripts de déploiement.

## Méthodologie Obligatoire
- Ne jamais coder sans spécification préalable et sans tests écrits en premier (TDD strict).
- Boucle Evaluator-Optimizer systématique : aucun code n'est considéré comme terminé sans audit du Code Reviewer.
- Zéro secret en dur dans le code ; configuration via `.env.example`.
