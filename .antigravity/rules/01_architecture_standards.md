# RÈGLE 01 : STANDARDS D'ARCHITECTURE ET DE DESIGN (2026)

## 1. Principes d'Ingénierie Logicielle
- **Clean Architecture & Ports/Adapters (Hexagonale)** :
  - Isoler le domaine métier (*Domain Core*) de tout framework, base de données ou transport externe.
  - Les dépendances doivent pointer exclusivement vers l'intérieur (de l'infrastructure vers le domaine).
- **Principes SOLID** :
  - *Single Responsibility* : Une classe / fonction / module a une et une seule raison de changer.
  - *Open/Closed* : Ouvert à l'extension, fermé à la modification.
  - *Liskov Substitution* : Les sous-types doivent être substituables à leurs types de base.
  - *Interface Segregation* : Découper les interfaces monolithiques en contrats précis.
  - *Dependency Inversion* : Dépendre d'abstractions, non de détails d'implémentation.
- **KISS & YAGNI** :
  - Privilégier les solutions lisibles, directes et maintenables. Éviter la sur-ingénierie spéculative.

## 2. Approche API & Contract-First
- Tout échange entre composants (Backend <-> Frontend, Microservice <-> Microservice) doit disposer d'un contrat explicite :
  - **REST / HTTP** : Spécification OpenAPI v3.1 / JSON Schema.
  - **RPC** : Protobuf v3 pour gRPC.
  - **TypeScript** : Typage strict (`strict: true`), aucun usage de `any` sans justification explicite (`unknown` avec validation par Zod/Valibot).

## 3. Architecture Decision Records (ADRs)
- Tout choix structurant (changement de base de données, adoption d'un protocole, bibliothèque d'authentification, refonte d'état) doit faire l'objet d'un fichier ADR dans `docs/adr/ADR-XXX-<titre>.md` comportant :
  - **Statut** : Proposé / Accepté / Déprécié.
  - **Contexte & Problème**.
  - **Options étudiées** (au moins 2 alternatives comparées).
  - **Décision & Rationale**.
  - **Conséquences** (positives, négatives, risques).
