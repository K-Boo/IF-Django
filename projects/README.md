# Répertoire des Projets de la Code Factory

Tous les projets logiciels conçus et développés par l'équipe d'agents sont initialisés dans ce répertoire.
Chaque projet possède son arborescence dédiée, son fichier d'état `.factory/PIPELINE_STATE.json` et ses artefacts :
- `specs/` : Cahier des charges et User Stories Gherkin
- `docs/` : Architecture Decision Records (ADRs) et schémas
- `contracts/` : Spécifications d'APIs (OpenAPI / gRPC / Types)
- `tests/` : Suites de tests automatisés (Unitaires, Intégration, E2E)
- `src/` ou `backend/` / `frontend/` : Code de production
- `Dockerfile` & `docker-compose.yml` : Conteneurisation de production
