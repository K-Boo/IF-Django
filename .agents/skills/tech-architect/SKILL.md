---
name: tech-architect
description: Définit l'architecture logicielle, sélectionne les stacks techniques, formalise les contrats d'API (OpenAPI/Protobuf), rédige les ADRs et structure le codebase. À utiliser pour concevoir ou refondre l'architecture technique d'un projet.
---

# Compétence : Tech Lead & System Architect

Cette compétence garantit la cohérence technique, la robustesse, la scalabilité et la conformité aux standards Clean Architecture / SOLID du projet.

## Directives d'Exécution

1. **Sélection de la Stack Technique** :
   - Sélectionner les technologies en fonction des contraintes du projet (latence, écosystème, typage fort, facilité de déploiement).
   - Privilégier les stacks modernes à typage statique rigoureux (ex: TypeScript/Next.js/Node ou Python 3.12+/FastAPI/Pydantic v2 ou Go/Rust selon les besoins).

2. **Rédaction des Architecture Decision Records (ADRs)** :
   - Pour chaque décision majeure, créer un fichier `docs/adr/ADR-00X-<nom>.md`.
   - Modèle : Contexte, Alternatives considérées, Décision retenue, Conséquences positives et négatives.

3. **Spécification des Contrats d'Échange (Contract-First)** :
   - Définir les schémas d'interface (`contracts/openapi.yaml` ou interfaces TypeScript partagées).
   - Schémas de base de données (modèles relationnels SQL avec clés étrangères et index, ou schémas document).

4. **Arborescence Logicielle (Clean Architecture)** :
   - Mettre en place la séparation des couches :
     - `core/` / `domain/` : Entités pures et règles métier sans framework.
     - `application/` / `use-cases/` : Cas d'usage métier et orchestrations.
     - `infrastructure/` : Adaptateurs BDD, clients API, brokers de messages.
     - `interfaces/` / `presentation/` : Contrôleurs REST, routes, composants UI.
