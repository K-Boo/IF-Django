# RÈGLE 04 : STRATÉGIE GIT, BRANCHING ET REVUE DE CODE

## 1. Modèle de Branching (Trunk-Based avec Short-Lived Feature Branches)
- La branche principale est `main` (toujours déployable, toujours verte).
- Chaque feature ou correctif s'effectue dans une branche dédiée :
  - `feat/<nom-kebab-case>` : Nouvelle fonctionnalité.
  - `fix/<nom-kebab-case>` : Correctif de bug.
  - `test/<nom-kebab-case>` : Ajout ou renforcement de tests.
  - `refactor/<nom-kebab-case>` : Amélioration sans changement fonctionnel.
  - `docs/<nom-kebab-case>` : Documentation.
- Pour les agents en exécution concurrente, privilégier l'usage de **Git Worktrees** afin d'isoler physiquement les modifications sans collision sur l'arbre de travail.

## 2. Format des Commits (Conventional Commits)
Chaque commit doit respecter le standard :
```
<type>(<portée>): <description impérative et concise>

[Corps optionnel expliquant le 'pourquoi' et non le 'comment']

[Pieds de page, ex: Closes #12, BREAKING CHANGE: ...]
```
Types autorisés : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`.

## 3. Critères de Fusion (*Merge Readiness Gate*)
Avant toute fusion sur `main`, les conditions cumulatives suivantes sont impératives :
1. Les tests automatisés passent à 100% en CI.
2. Le linteur et le formateur s'exécutent sans aucun avertissement bloquant (`0 errors, 0 warnings`).
3. La couverture de code respecte le seuil minimal de 80%.
4. L'agent **Code Reviewer / Sécurité** a délivré un avis favorable (`STATUS: APPROVED`) sans vulnérabilité détectée.
