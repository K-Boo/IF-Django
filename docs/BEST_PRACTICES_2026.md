# État de l'Art de l'Ingénierie Agentique (14 Septembre 2026)

Ce document synthétise les meilleures pratiques mondiales publiées et appliquées par les leaders de l'IA générative et du code agentique : **Anthropic (Claude)**, **Google DeepMind (Antigravity)**, et **OpenAI (Codex)**.

---

## 1. Principes Clés d'Anthropic (Claude Agentic Engineering)

### A. Le Pattern Orchestrator-Workers
- Les modèles de pointe résolvent beaucoup mieux les problèmes complexes lorsqu'ils sont décomposés en flux modulaires plutôt que d'attendre d'un agent unique qu'il conçoive, code, teste et déploie en une seule invite.
- L'orchestrateur maintient la vision globale et délègue l'exécution à des sous-agents spécialisés travaillant sur des périmètres restreints.

### B. La Boucle Evaluator-Optimizer
- Séparation explicite entre le rôle de **Générateur / Développeur** et le rôle d'**Évaluateur / Reviewer**.
- Un LLM a tendance à approuver son propre code ou à sous-estimer ses propres biais. Un agent distinct avec un prompt d'audit critique (évaluation aveugle ou contradictoire) permet d'identifier jusqu'à 4 fois plus d'anomalies subtiles.
- Les retours de l'évaluateur doivent être formulés sous forme d'instructions correctives exploitables par une machine (*machine-actionable feedback*).

### C. Hygiène du Contexte (Context Hygiene)
- Éviter à tout prix la pollution du contexte (*Context Rot*).
- Les sous-agents doivent démarrer avec un contexte éphémère et ciblé, sans l'historique volumineux de toutes les conversations précédentes.
- La mémoire partagée doit être matérialisée par des fichiers structurés sur disque (*Persistent File-Based State* : `SPEC.md`, `ADR-xxx.md`, `TASKS.json`).

---

## 2. Principes Clés de Google DeepMind (Antigravity)

### A. Divulgation Progressive (Progressive Disclosure)
- Plutôt que d'injecter des méga-prompts de 50 000 tokens contenant tous les manuels possibles, Antigravity utilise le concept de compétences découvertes (`skills/<nom>/SKILL.md`).
- Seules les métadonnées (nom et description concise) sont visibles par défaut. Le contenu complet de la compétence n'est chargé que lorsque l'agent décide formellement d'en avoir besoin.

### B. Hiérarchie Stricte des Règles de Workspace
- Organisation en cascade : règles globales de l'utilisateur (`~/.gemini/config`), règles du workspace (`.antigravity/rules/`, `GEMINI.md`), règles de sous-dossiers.
- Les règles ont valeur de contrainte absolue sur les décisions du modèle (*Hard Constraints*).

### C. Artefacts Vivants et Boucle de Vérification
- Utilisation des artefacts (`implementation_plan.md`, `walkthrough.md`) pour formaliser le contrat entre l'utilisateur et l'agent avant toute action destructrice.
- Vérification systématique par exécution d'outils réels dans le shell (compilation, lint, exécution de tests) au lieu de supposer que le code fonctionne.

---

## 3. Principes Clés d'OpenAI (Codex / SWE-bench Methodology)

### A. Spec-Driven & Test-Driven Development (TDD)
- Les benchmarks industriels (comme SWE-bench Verified) démontrent que les agents de code atteignent leur taux de réussite maximal lorsqu'un harnais de test rigoureux précède l'implémentation.
- Le cycle Gherkin -> Test rouge -> Implémentation verte garantit qu'aucune régression silencieuse n'est introduite.

### B. Environnements Déterministes & Reproductibilité
- Utilisation de conteneurs Docker et de versions figées (lockfiles stricts) pour garantir que le comportement observé lors de la vérification de l'agent est 100% reproductible sur la machine de l'utilisateur et en production.

### C. Isolation par Git Worktrees
- Évite les conflits de fichiers en cas d'exécution concurrente de sous-agents en branchant chaque tâche dans un répertoire physique indépendant (`git worktree`).
