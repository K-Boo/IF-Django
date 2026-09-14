# DIRECTIVES MAÎTRESSES : CODE FACTORY AGENTIQUE (2026)

Bienvenue dans la configuration centrale de la **Code Factory Agentique**.
Chaque agent opérant dans ce workspace **DOIT RESPECTER STRICTEMENT** l'intégralité des instructions contenues dans ce dossier `.antigravity`.

---

## 1. Principes Fondamentaux de l'Ingénierie Agentique (2026)

1. **Spécialisation Étanche des Rôles** :
   - Aucun agent ne doit tenter de tout faire seul.
   - Les tâches sont distribuées selon la matrice des responsabilités : Product Owner, Architecte, TDD/QA, Développeur Backend, Développeur Frontend, Code Reviewer / Sécurité, DevOps.
   - L'Orchestrateur supervise le flux sans écrire de code applicatif direct.

2. **Développement Guidé par les Spécifications (*Spec-First*)** :
   - Interdiction formelle d'écrire du code de production sans :
     - Une spécification formelle (`specs/SPEC.md`).
     - Des User Stories avec critères d'acceptation Gherkin (*Given / When / Then*).
     - Une validation d'architecture (*Architecture Decision Record* - ADR) pour tout choix technique structurant.

3. **Discipline TDD Absolue (*Test-Driven Development*)** :
   - Cycle obligatoire : **Red -> Green -> Refactor**.
   - L'agent QA / TDD écrit les tests automatisés (qui échouent initialement) avant que les développeurs n'implémentent le code métier.
   - Un commit ou une pull request n'est jamais validé si la suite de tests ne passe pas à 100% avec une couverture minimale de 80%.

4. **Boucle Fermée *Evaluator-Optimizer*** :
   - Le code produit par les agents développeurs est systématiquement soumis à l'agent **Code Reviewer & Sécurité**.
   - Si des vulnérabilités (OWASP Top 10), des régressions ou des entorses aux règles de qualité sont détectées, le Reviewer renvoie un rapport d'anomalie précis avec suggestions de remédiation.
   - L'agent développeur corrige de façon autonome (maximum 3 à 5 itérations). Si le problème persiste, il escalade à l'humain.

5. **Hygiène du Contexte & Divulgation Progressive (*Progressive Disclosure*)** :
   - Ne jamais charger l'intégralité des fichiers de documentation dans le prompt.
   - Utiliser les artefacts partagés (`specs/`, `docs/`, `contracts/`, `implementation_plan.md`, `walkthrough.md`) comme mémoire externe persistante.
   - Chaque sous-agent reçoit un contexte concis et ciblé sur sa tâche.

6. **Isolation et Zéro Régression** :
   - Tout développement de feature s'effectue dans une branche ou un worktree git dédié (`feat/`, `fix/`, `test/`).
   - L'environnement de build et d'exécution doit être reproductible (Docker / devcontainer).
   - Les secrets ne doivent JAMAIS être committés ni injectés en dur (utilisation exclusive de variables d'environnement documentées dans `.env.example`).

---

## 2. Table des Règles Obligatoires

Consultez et appliquez les règles détaillées dans les sous-dossiers :
- [01_architecture_standards.md](./rules/01_architecture_standards.md) : Clean Architecture, SOLID, modularité, API contract-first.
- [02_tdd_and_quality.md](./rules/02_tdd_and_quality.md) : Pyramide de tests, seuils de couverture, mocks, assertions strictes.
- [03_security_and_compliance.md](./rules/03_security_and_compliance.md) : OWASP Top 10, CWE, sanitisation des entrées, Zero Trust.
- [04_git_and_branching.md](./rules/04_git_and_branching.md) : Conventional Commits, workflow git, critères de merge.

---

## 3. Workflows Opérationnels

Pour exécuter un cycle de production, référez-vous aux SOPs :
- [Workflow Nouveau Projet](./workflows/new-project.md) : De l'idée à la première livraison validée.
- [Workflow Sprint / Feature](./workflows/sprint-iteration.md) : Développement itératif d'une fonctionnalité.
