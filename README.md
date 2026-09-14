# 🏭 Code Factory Agentique (État de l'art 2026)

Bienvenue dans la **Code Factory Agentique**, un environnement d'ingénierie logicielle autonome permettant de développer n'importe quel projet d'application en orchestrant une équipe complète d'agents virtuels spécialisés.

Cette plateforme matérialise l'état de l'art des méthodologies de développement agentique au **14 septembre 2026**, fusionnant les pratiques d'excellence recommandées par **Anthropic (Claude)**, **Google DeepMind (Antigravity)** et **OpenAI (Codex)**.

---

## 🎯 Vision & Capacités

La Code Factory reproduit fidèlement la dynamique d'une équipe de développement senior d'élite :
- **Product Owner / Spec Architect** : Transforme les intentions en User Stories et scénarios Gherkin formels.
- **Tech Lead / System Architect** : Élabore l'architecture (Clean Arch / SOLID), choisit la stack et contractualise les APIs (ADRs, OpenAPI).
- **TDD Lead / QA Engineer** : Rédige le harnais de tests avant toute ligne de code de production (**Phase Red**).
- **Développeurs Backend & Frontend** : Implémentent le code métier jusqu'à satisfaction intégrale des tests (**Phase Green**).
- **Code Reviewer & Security Auditor** : Audite le code (OWASP Top 10, CWE, typage strict) et pilote la boucle **Evaluator-Optimizer**.
- **DevOps & SRE Specialist** : Conteneurise avec Docker multi-stage, compose et configure la CI/CD GitHub Actions.

---

## 🏛️ Architecture du Workspace

```
c:\tools\CodeFactory\
├── .antigravity/                   # Configuration centrale & RÈGLE GLOBALE OBLIGATOIRE
│   ├── INSTRUCTIONS.md             # Directives maîtresses de l'usine logicielle
│   ├── rules/                      # Règles d'architecture, TDD, sécurité et git
│   └── workflows/                  # SOPs : new-project.md & sprint-iteration.md
├── .agents/                        # Système de compétences natives Antigravity
│   └── skills/                     # Compétences progressives (factory-orchestrator, etc.)
├── core/                           # Moteur CLI & Orchestrateur TypeScript
│   ├── src/agents/                 # Prompts et définitions des 8 rôles
│   ├── src/engine/                 # Machine à états & boucle Evaluator-Optimizer
│   └── src/templates/              # Scaffolds (fullstack-ts, python-fastapi, cli-tool)
├── projects/                       # Répertoire hébergeant les projets développés
├── docs/                           # Documentation exhaustive
│   ├── ARCHITECTURE.md             # Schéma et flux de données
│   ├── AGENTS_ROLES.md             # Matrice des responsabilités et prompts
│   ├── PLAYBOOK.md                 # Guide pratique d'utilisation
│   └── BEST_PRACTICES_2026.md      # Synthèse des patterns Anthropic / Google / OpenAI
├── GEMINI.md                       # Directive racine Antigravity
└── README.md                       # Présentation générale
```

---

## 🚀 Démarrage Rapide

### Option A : Via le Chat Antigravity
Demandez simplement à l'agent :
> *"Orchestrateur, initialise un nouveau projet 'mon-app' de type fullstack-ts avec pour objectif de créer un tableau de bord analytique en temps réel."*

L'Orchestrateur activera automatiquement les compétences spécialisées via Antigravity (`spec-architect`, `tech-architect`, `tdd-lead`, etc.).

### Option B : Via la Ligne de Commande (CLI `code-factory`)
```powershell
cd c:\tools\CodeFactory\core

# 1. Lister les 8 agents disponibles
npm run cli -- agents

# 2. Lister les templates disponibles
npm run cli -- templates

# 3. Créer un nouveau projet managé
npm run cli -- new dashboard-app --template fullstack-ts --goal "Dashboard analytique en temps réel"

# 4. Consulter l'état du pipeline
npm run cli -- status dashboard-app

# 5. Lancer l'audit de sécurité / revue
npm run cli -- review dashboard-app
```

---

## 🛡️ Règles de Conformité Absolue
1. **Spec-First** : Aucun développement sans spécification (`specs/SPEC.md`) et sans critères Gherkin validés.
2. **TDD Strict** : Les tests sont écrits d'abord (Red), puis le code est produit pour les faire passer (Green).
3. **Zéro Vulnérabilité** : Aucune fusion sans le visa de conformité du Code Reviewer (absence de failles OWASP Top 10, couverture >= 80%).
4. **Zéro Secret Committé** : Injection exclusive via variables d'environnement documentées dans `.env.example`.
