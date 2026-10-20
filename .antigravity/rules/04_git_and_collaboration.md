# RÈGLE 04 : STRATÉGIE GIT & COLLABORATION INTER-DÉPÔTS

## 1. Topologie des Deux Dépôts
- **Dépôt 1 : `CodeFactory-Agentic` (GitHub - `git@github.com:K-Boo/IF-Django.git`)** :
  - Héberge l'intelligence agentique, les règles d'ingénierie, les prompts des agents assistants et les grilles d'évaluation.
- **Dépôt 2 : `if-django` (GitLab Univ-Lille - `git@gitlab-ssh.univ-lille.fr:khalil.bouchama.etu/if-django.git`)** :
  - Dépôt officiel partagé avec les camarades de classe, les enseignants et le groupe.
  - Héberge le code source de l'application, les tests, le TP dirigé, les slides et les fichiers Docker.

## 2. Règle du Code Progressif
- Ne jamais pousser de code applicatif Django sur le dépôt partagé sans validation explicite de l'utilisateur.
- Chaque étape de développement doit être traçable, accompagnée d'un message Conventional Commit clair (`feat(wallet): ...`, `docs(tp): ...`, `test(expenses): ...`).
- Le pipeline CI/CD GitLab doit rester vert en permanence.
