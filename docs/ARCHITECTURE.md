# Architecture de la Code Factory Agentique (2026)

## 1. Vue d'Ensemble du Système

La **Code Factory Agentique** est conçue pour fonctionner comme une équipe de développement logiciel autonome de classe mondiale. Elle combine la décomposition des responsabilités en agents spécialisés, le développement guidé par les tests (TDD) et une boucle de rétroaction fermée *Evaluator-Optimizer*.

```mermaid
graph TB
    subgraph Client & Déclenchement
        User[Utilisateur / Développeur Humain]
        CLI[Code Factory CLI : 'factory new / run']
        Chat[Interface Antigravity / Chat Agentique]
    end

    subgraph "Orchestration & Mémoire Partagée"
        Orchestrator[Factory Orchestrator]
        State[State Machine & Memory Store]
        Artifacts[Artefacts Partagés : specs/, docs/, tests/, src/]
    end

    subgraph "Équipe d'Agents Spécialisés"
        PO[Product Owner & Spec Architect]
        Arch[Tech Lead & System Architect]
        QA[TDD Lead & QA Engineer]
        Backend[Backend Developer]
        Frontend[Frontend Developer]
        Reviewer[Code Reviewer & Security Auditor]
        DevOps[DevOps & SRE Specialist]
    end

    User --> CLI
    User --> Chat
    CLI --> Orchestrator
    Chat --> Orchestrator

    Orchestrator <--> State
    State <--> Artifacts

    Orchestrator -->|1. Cadrage| PO
    PO -->|Specs & Gherkin| Artifacts

    Orchestrator -->|2. Architecture| Arch
    Arch -->|ADRs & Contrats d'API| Artifacts

    Orchestrator -->|3. TDD Harnais (Red)| QA
    QA -->|Tests Unitaires & E2E échouants| Artifacts

    Orchestrator -->|4. Implémentation (Green/Refactor)| Backend
    Orchestrator -->|4. Implémentation (Green/Refactor)| Frontend
    Backend -->|Code Serveur| Artifacts
    Frontend -->|Composants UI| Artifacts

    Orchestrator -->|5. Audit & Validation| Reviewer
    Reviewer -->|Analyse Statique & OWASP| Artifacts

    Reviewer -- "Rejet (Boucle Evaluator-Optimizer)" --> Backend
    Reviewer -- "Rejet (Boucle Evaluator-Optimizer)" --> Frontend

    Reviewer -- "Approbation (Gate franchie)" --> DevOps
    DevOps -->|Docker, CI/CD, Déploiement| Artifacts
    DevOps -->|Livrable Final| User
```

---

## 2. Les Principes d'Ingénierie Clés

### A. Pattern Orchestrator-Workers (Anthropic)
Au lieu de confier l'intégralité d'un projet à un unique prompt monolithique, l'Orchestrateur décompose le travail en sous-objectifs délimités, délègue à des agents aux compétences ciblées et synthétise les résultats. Cela garantit une préservation maximale de la fenêtre de contexte et prévient les hallucinations d'oubli.

### B. Boucle Evaluator-Optimizer
L'agent **Code Reviewer** agit comme un juge indépendant (*Evaluator*). Il évalue le code produit à l'aune d'une grille stricte (zéro vulnérabilité OWASP, typage strict, passage de 100% des tests). En cas de non-conformité, il formule des directives correctives concrètes renvoyées aux développeurs (*Optimizers*) pour itération autonome (jusqu'à 5 itérations).

### C. Mécanisme Spec-First & TDD Red-Green-Refactor (OpenAI Codex / SWE-bench)
Le code n'est jamais écrit avant les spécifications fonctionnelles et les tests automatisés. Les tests constituent la vérité de référence incontestable contre laquelle les performances du modèle sont mesurées.

### D. Progressive Disclosure & Context Budgeting (Google Antigravity)
Les compétences et règles ne sont pas injectées en bloc dès le démarrage. Antigravity charge les fichiers `SKILL.md` et les règles contextuelles uniquement lorsque la phase correspondante est activée, garantissant une utilisation optimale des tokens et une grande rapidité d'exécution.
