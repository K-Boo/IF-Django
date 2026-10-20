# RÈGLE 01 : STANDARDS ET IDIOMES DJANGO (« THE DJANGO WAY »)

## 1. Architecture Modulaire par Applications
- Découpage strict du projet en applications Django autonomes et ciblées :
  - `apps.accounts` : Gestion des utilisateurs et de l'authentification.
  - `apps.wallets` : Porte-monnaies communs, adhésions et système d'invitations.
  - `apps.expenses` : Dépenses, répartition des montants, clôture et calcul des balances.
- Séparation des responsabilités :
  - Les règles métier et requêtes complexes résident dans les `models.py` ou des `managers.py` personnalisés, pas dans les vues.
  - Les vues (`views.py`) se limitent à la validation des formulaires/requêtes, à l'invocation des services métier et au rendu du template / réponse JSON.

## 2. Intégrité des Données & Concurrence
- Utilisation obligatoire de `transaction.atomic()` pour toute suite d'opérations nécessitant la cohérence ACID (ex: clôture de porte-monnaie, ajout de dépense multi-destinataires).
- Prévention des courses critiques (*Race Conditions*) : utilisation de verrous pessimistes `select_for_update()` ou d'expressions atomiques `F()` lors de la manipulation de compteurs financiers.

## 3. Sécurité Native de Django
- Protection CSRF obligatoire sur tous les formulaires (`{% csrf_token %}`).
- Requêtes ORM systématiques pour éviter les injections SQL (aucun SQL brut non paramétré).
- Vérification des permissions au niveau objet : un utilisateur ne peut supprimer une dépense que s'il en est l'auteur, ou le créateur du pot.
