# Guide Pratique & Playbook : Utilisation de la Code Factory

Ce guide vous accompagne pas-à-pas pour utiliser la **Code Factory Agentique** au quotidien, soit en mode interactif avec Antigravity, soit via le moteur CLI `code-factory`.

---

## 1. Utilisation via le Chat Antigravity (Mode Assisté)

Vous pouvez dialoguer directement avec l'Orchestrateur ou solliciter des compétences spécifiques en quelques commandes simples dans le chat :

### A. Démarrer un Nouveau Projet
```text
"Orchestrateur, je souhaite créer un nouveau projet nommé 'task-nexus' : 
une application web de gestion de tâches collaboratives en temps réel avec Next.js, FastAPI et PostgreSQL. 
Lance le workflow complet de la factory."
```
L'Orchestrateur va :
1. Déclencher `spec-architect` pour générer `specs/SPEC.md` et les User Stories Gherkin.
2. Vous demander validation du cahier des charges.
3. Déclencher `tech-architect` pour l'architecture et les ADRs.
4. Déclencher `tdd-lead` pour écrire les tests initiaux qui échouent (Red).
5. Déclencher `backend-dev` et `frontend-dev` pour implémenter le code (Green).
6. Déclencher `code-reviewer` pour auditer le code (Evaluator-Optimizer).
7. Déclencher `devops-deployer` pour produire le Dockerfile et la CI/CD.

### B. Ajouter une Fonctionnalité Spécifique (Mode Sprint)
```text
"Ajoute l'authentification OAuth2 avec Google et GitHub sur le projet 'task-nexus' en suivant le workflow sprint-iteration."
```

### C. Lancer un Audit de Sécurité Dédié
```text
"Active la compétence code-reviewer pour auditer l'ensemble du dossier projects/task-nexus/backend."
```

---

## 2. Utilisation via le CLI `code-factory` (Mode Ligne de Commande)

Le moteur `core/` met à disposition une interface en ligne de commande pour automatiser ou scripter la chaîne de production :

### Afficher l'aide et les commandes disponibles
```powershell
cd c:\tools\CodeFactory\core
npm run cli -- --help
```

### Initialiser un nouveau projet
```powershell
npm run cli -- new my-app --template fullstack-ts
```

### Inspecter l'état du pipeline d'un projet
```powershell
npm run cli -- status --project my-app
```

### Lancer la suite de validation / audit
```powershell
npm run cli -- review --project my-app
```

---

## 3. Personnaliser les Règles de la Factory

Toutes les règles de conformité résident dans `.antigravity/rules/` :
- Pour ajouter une norme interne d'entreprise (ex. conventions de nommage, bibliothèques obligatoires), ajoutez simplement un fichier markdown dans `.antigravity/rules/` (ex. `05_company_guidelines.md`).
- Les agents liront automatiquement ces directives lors de leurs sessions de travail.
