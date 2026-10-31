# RÈGLE 07 : STANDARDS DE RECETTE E2E, SÉCURITÉ OWASP & TESTS AGENTIQUES

## 1. Principe de la Sandbox Éphémère (Zero Data Pollution)
- Tout test End-to-End (E2E) ou pilotage de navigateur automatisé (Chrome DevTools / Playwright) doit s'exécuter sur une base de données temporaire dédiée (`e2e_temp_db.sqlite3`), configurée dynamiquement via `DATABASE_URL`.
- La base éphémère doit être initialisée avec un jeu de données minimal et impérativement détruite (`teardown`) à l'issue de la recette (`Test-Path: False`).
- Aucun test E2E ne doit altérer la base de développement locale ni les données partagées de l'équipe.

## 2. Invariant de Localisation des Nombres dans les Templates Django
- Dans les templates Django avec localisation active (`USE_I18N = True` / `USE_L10N = True`), les champs masqués (`<input type="hidden">`) transmettant des montants financiers à des contrôleurs Python ne doivent JAMAIS afficher de virgule décimale (`30,00`).
- Utiliser obligatoirement le filtre natif `unlocalize` :
  ```django
  {% load l10n %}
  <input type="hidden" name="amount" value="{{ t.amount|unlocalize }}">
  ```

## 3. Étanchéité et Discipline des Dépôts Git
- **Dépôt GitLab Académique (`if-django-2026`)** : Réservé exclusivement au code source applicatif propre, aux gabarits, à la configuration Docker/CI et aux tests unitaires officiels évalués par les enseignants.
- **Dépôt GitHub Agentique (`IF-Django`)** : Héberge les scripts de recette E2E, les captures d'écran, les audits de sécurité, les analyses de tests et les guides didactiques.
