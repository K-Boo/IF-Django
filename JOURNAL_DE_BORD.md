# Journal de Bord : Initialisation du Projet M2 MIAGE IF-Django

**Module** : Infrastructures & Frameworks (IF) — Master 2 MIAGE / IFI (Université de Lille)  
**Enseignants** : Romain ROUVOY & Gaëtan HASBROUCQ  
**Technologie** : Django (Python)  
**Sujet d'Application** : « Les Bons Comptes » (Porte-monnaie partagé / gestion de dépenses de groupe)  
**Dépôt Agentique (GitHub Privé)** : `git@github.com:K-Boo/IF-Django.git`  
**Dépôt Académique & Code (GitLab Univ-Lille)** : `git@gitlab-ssh.univ-lille.fr:khalil.bouchama.etu/if-django-2026.git` (`https://gitlab.univ-lille.fr/khalil.bouchama.etu/if-django-2026`)  
**Date d'Initialisation** : 20 Octobre 2026  

---

## 📋 Contexte et Décisions Fondamentales

1. **Rupture avec les paradigmes GLOP** :
   - Abandon total de l'approche microservices d'entreprise générique.
   - Recentrage strict sur les attendus du module **IF-Django** : exploration pédagogique approfondie de Django, transmission du savoir à la promotion (séance de 3 heures : 60 min de présentation magistrale + 120 min de TP dirigé).
2. **Règle d'or de la Phase 1 : Zéro Code Applicatif Métier Prématuré** :
   - La présente phase configure l'ensemble des dépôts, les spécifications fonctionnelles, l'infrastructure partagée et les règles d'ingénierie.
   - Le code applicatif Django (modèles, vues, templates, API) sera développé au fur et à mesure avec validation humaine.
3. **Séparation Étanchée et Discrétion Absolue du Dépôt GitLab** :
   - **Dépôt GitHub privé** (`git@github.com:K-Boo/IF-Django.git`) : héberge l'ensemble de l'outillage agentique, les prompts des experts virtuels, la préparation du matériel didactique (slides et TP dans `pedagogy/`) et le journal de bord technique.
   - **Dépôt GitLab académique** (`git@gitlab-ssh.univ-lille.fr:khalil.bouchama.etu/if-django.git`) : strictement réservé au projet applicatif pour les professeurs et collègues. **Zéro trace, zéro mention d'IA, d'agents, de prompts ou de liens vers GitHub. Historique de commit 100% propre sous identité universitaire.**
4. **Coordination Multi-Agents pour le Groupe de 3 Étudiants** :
   - Chaque étudiant dispose de son assistant IA.
   - Le bus de synchronisation partagé est `docs/SUIVI_AVANCEMENT.md` sur GitLab.
   - La règle `.antigravity/rules/05_multi_agent_coordination.md` formalise la façon dont les agents lisent l'avancement des autres membres pour adapter leur travail en fonction des dépendances.

---

## ⏱️ Chronologie Détaillée des Actions Réalisées

### Étape 1 : Cadrage et Alignement des Attentes
- Analyse du sujet officiel `IF-Intro.pdf` du module Infrastructures & Frameworks.
- Identification des exigences du sujet « Les Bons Comptes » : Comptes, Pots partagés, Invitations, Dépenses avec attribution du payeur, Droits de suppression réservés au payeur/créateur, Clôture et calcul des soldes nets, Algorithme de minimisation des dettes, Volumétrie (*Think HUGE*).
- Prise en compte de la contrainte explicite : *« Le backend de l'application doit être partagé entre tous les étudiants du groupe »*.

### Étape 2 : Configuration du Dépôt d'Assistance Agentique (GitHub)
- Nettoyage des reliquats de l'ancienne usine générique.
- Rédaction de `.antigravity/INSTRUCTIONS.md` et des règles spécialisées :
  - `01_django_standards.md` : Idiomes Django, Clean Architecture par apps, intégrité transactionnelle.
  - `02_pedagogical_standards.md` : Didactique de l'atelier, taxonomie de Bloom, détection des pièges étudiants.
  - `03_performance_and_scale.md` : « Think HUGE », élimination des requêtes N+1, agrégations SQL natives.
  - `04_git_and_collaboration.md` : Stratégie de double versionnage GitHub / GitLab.
  - `05_multi_agent_coordination.md` : Protocole de synchronisation inter-agents via le registre d'avancement.
- Définition de 4 compétences d'assistance : `pedagogy-lead`, `django-architect`, `django-qa-tester`, `devops-multiuser`.
- Sauvegarde du matériel pédagogique dans `pedagogy/` (`tp/`, `presentation/`, `instructions_sujet/`).
- Connexion au dépôt distant `git@github.com:K-Boo/IF-Django.git` et push sur la branche `main`.

### Étape 3 : Réinitialisation à Neuf du Dépôt GitLab Académique (Historique Vierge)
- Réception du nouveau dépôt GitLab recréé par l'utilisateur avec un commit initial unique.
- Configuration de l'identité Git locale avec l'adresse universitaire de l'étudiant (`Khalil Bouchama <khalil.bouchama.etu@univ-lille.fr>`).
- Dépôt exclusif de la base du projet applicatif :
  - `README.md` : Présentation du projet pour les enseignants et prérequis.
  - `.gitignore`, `.env.example`, `requirements.txt`.
  - `docker-compose.yml` : Configuration PostgreSQL 16 conteneurisée partagée.
  - `.gitlab-ci.yml` : Pipeline d'intégration continue GitLab.
  - `docs/SPECIFICATIONS.md` : Cahier des charges fonctionnel complet.
  - `docs/ARCHITECTURE.md` : Modèle de données MCD et conventions d'architecture.
- Scan lexical exhaustif validant **zéro trace ou mention d'IA/agent/GitHub**.
- Commit et push propre :
  `7c8da56 Initial commit` -> `4668f1f feat: initialisation de l'environnement, specifications et architecture`.

### Étape 4 : Déploiement du Plan de Répartition en 3 Volets & Tableau de Suivi
- Rédaction de [`docs/REPARTITION_PROJET.md`](file:///C:/Users/hpome/Documents/M2_MIAGE/IF-Django/docs/REPARTITION_PROJET.md) :
  - **Membre 1** : `apps.accounts`, `apps.wallets` + Présentation Partie 1 (MVT/Auth) + TP Exercice 1 (Modèles & Admin).
  - **Membre 2** : `apps.expenses`, Répartitions, Algorithme de dette + Présentation Partie 2 (ORM/Agrégations) + TP Exercice 2 (N+1 & SQL).
  - **Membre 3** : Performance "Think HUGE", Concurrence, Transactions atomiques, Docker + Présentation Partie 3 (Charge & Quiz) + TP Exercice 3 (Concurrence).
- Rédaction de [`docs/SUIVI_AVANCEMENT.md`](file:///C:/Users/hpome/Documents/M2_MIAGE/IF-Django/docs/SUIVI_AVANCEMENT.md) : Registre de synchronisation permettant à chaque membre et son agent de connaître l'état précis des dépendances et contrats disponibles.
- Scan d'intégrité (0 terme suspect) et publication sur GitLab :
  `8418f56 docs(team): plan de repartition du travail en 3 parties et tableau de suivi`.

### Étape 5 : Réalisation, Livraison et Validation du Volet 1 (`apps.accounts` & `apps.wallets`)
- **Dépôt officiel académique GitLab** : `https://gitlab.univ-lille.fr/khalil.bouchama.etu/if-django-2026`
- **Application `apps.accounts` achevée** :
  - Modèle utilisateur personnalisé `User(AbstractUser)` avec `email` unique (`AUTH_USER_MODEL = "accounts.User"`).
  - Vues d'inscription, de connexion et profil utilisateur francisées avec gabarits épurés.
- **Application `apps.wallets` achevée** :
  - Modèle `Wallet` avec clé primaire UUID4 non prédictible, devises, statuts (`OUVERT` / `CLOS`), créateur.
  - Modèle `WalletMembership` avec rôles (`ADMIN` / `MEMBRE`), statuts d'invitation (`INVITE`, `ACCEPTE`, `REFUSE`), et contrainte d'unicité `unique_wallet_membership`.
  - Vues et logique métier complètes : création transactionnelle (`transaction.atomic`), tableau de bord des cagnottes, système d'invitations avec vérification de permissions (`PermissionDenied`), vues d'acceptation et de refus.
  - Gabarits HTML responsives et stylisés (`base.html`, `wallet_list.html`, `wallet_detail.html`, `wallet_form.html`, `wallet_invite.html`).
- **Assurance qualité & Intégration continue** :
  - Configuration de `flake8` et intégration des tests unitaires Django (`TestCase`).
  - Validation des commits selon la convention `Conventional Commits` (ex: `3cbebcf`, `92ad133`, `7787449`, `696ec45`).
- **Validation du contrat d'interface pour le Membre 2 (`apps.expenses`)** :
  - Les modèles `User` et `Wallet` sont testés et disponibles sur la branche `main` pour brancher `Expense` et `ExpenseShare`.
  - Recommandations transmises pour l'intégration : routage par `<uuid:wallet_id>`, clé `PROTECT` sur le payeur, et filtrage des participants sur `WalletMembership.Status.ACCEPTED`.


### Étape 6 : Réalisation, Livraison et Validation du Volet 2 (`apps.expenses`)
- **Auteur & Responsable du volet** : Membre 2 (Gautam Demeulemeester)
- **Application `apps.expenses` entièrement développée et intégrée** :
  - **Modélisation relationnelle & Intégrité financière** :
    - Modèle `Expense` : titre, montant `DecimalField(max_digits=10, decimal_places=2)` avec `MinValueValidator(Decimal("0.01"))`, date, clé étrangère vers `Wallet` (`CASCADE`), et clé `PROTECT` sur le payeur `User` (sécurité interdisant la suppression d'un compte avec des créances en cours).
    - Modèle `ExpenseShare` : quote-part de dépense avec contrainte d'unicité `UniqueConstraint(fields=["expense", "user"])`.
    - Migration initiale `0001_initial.py` générée et appliquée.
    - Administration Django complète (`admin.py`) avec `ExpenseAdmin`, filtres, recherche et `ExpenseShareInline` (`TabularInline`).
  - **Formulaire de saisie & Répartition équitable (`forms.py`)** :
    - `ExpenseForm` : filtrage dynamique des payeurs et bénéficiaires restreint aux membres actifs acceptés du porte-monnaie courant.
    - Algorithme de répartition en centimes entiers avec redistribution unitaire du centime résiduel ($\sum \text{parts} = \text{montant}$ au centime près, sans perte ni dérive flottante).
  - **Vues métier & Sécurité d'accès (`views.py` & `urls.py`)** :
    - Vue `expense_create` sous transaction atomique ACID (`with transaction.atomic():`).
    - Vue `expense_delete` décorée avec `@require_POST`, appliquant le contrôle d'accès strict spécifié : suppression réservée au payeur de la dépense ou au créateur du porte-monnaie (levée de `PermissionDenied` HTTP 403 sinon).
    - Verrouillage automatique : interdiction d'ajouter ou supprimer des dépenses si le porte-monnaie est clos (`Wallet.Status.CLOSED`).
  - **Calcul des soldes nets & Optimisation ORM (« Think HUGE ») (`services.py`)** :
    - `get_wallet_total(wallet)` : total du pot calculé en 1 seule requête SQL via agrégation `Sum("amount")` et `Coalesce`.
    - `get_members_balances(wallet)` : calcul des soldes nets individuels ($Total Payé - Total Dû$) par doubles agrégations SQL `GROUP BY` (`values().annotate(Sum())`), garantissant un nombre constant de requêtes (zéro requête N+1).
    - Optimisation de la vue `wallet_detail` par l'ajout de `.prefetch_related("expenses__payer", "expenses__shares")`.
  - **Algorithme de dette glouton (`compute_settlement_plan`)** :
    - Algorithme de type *Cash Flow Minimization* (similaire à Splitwise / Tricount) associant à chaque itération le plus gros débiteur avec le plus gros créancier.
    - Minimisation du nombre de virements bancaires pour solder intégralement la cagnotte.
  - **Gabarits HTML & Expérience utilisateur** :
    - `expense_form.html` : formulaire de saisie ergonomique avec sélection des bénéficiaires.
    - `balances.html` : tableau de bord des soldes individuels avec badges colorés (créditeur, débiteur, équilibré) et cartes visuelles des virements recommandés.
    - Intégration dans `wallet_detail.html` : historique chronologique des dépenses, total engagé, bouton de suppression sécurisé et accès direct aux soldes.
  - **Tests unitaires automatisés & CI/CD (`tests.py`)** :
    - 11 tests unitaires couvrant les modèles, la protection `PROTECT`, les contraintes d'unicité, la précision des centimes résiduels, les calculs de soldes, l'algorithme glouton, les permissions HTTP 403 et le blocage sur cagnotte close.
    - Pipeline GitLab CI/CD 100% vert (jobs `lint` `flake8` à 0 anomalie et jobs `test` passants).
- **Contrats et objets désormais disponibles pour débloquer le Membre 3** :
  - L'application `apps.expenses` est stabilisée et déployée sur la branche `main`.
  - Les calculs de balances et le modèle `Expense` sont prêts pour l'implémentation de la fonction de clôture sécurisée (`close_wallet_safely` avec `select_for_update()`).
  - Le banc de tests est prêt pour l'intégration des tests de charge multithreadés de concurrence (`TransactionTestCase`).

### Étape 7 : Stabilisation de l'Environnement d'Exécution & Parité Dev/Prod (Python 3.12)
- **Constat & Analyse Technique** :
  - Détection d'une incompatibilité amont entre CPython 3.14.0 et Django 5.1.15 lors de la duplication de contexte de template (`BaseContext.__copy__` et `copy(super())`), provoquant une `AttributeError` sur le formulaire d'ajout d'utilisateur `/admin/accounts/user/add/`.
- **Décision d'Ingénierie Logicielle (Best Practice)** :
  - Rejet formel de la dette technique liée à un *monkey-patching* local dans le code applicatif.
  - Application stricte du principe de parité Dev/Prod (*Twelve-Factor App, Factor X*) : alignement de l'environnement local de développement sur la version de référence certifiée dans le pipeline GitLab CI (`python:3.12-slim`).
- **Actions Réalisées & Déploiement** :
  - Installation de Python 3.12.10 via `winget`.
  - Reconfiguration complète de l'environnement virtuel `.venv` sous Python 3.12.
  - Réinstallation et vérification de l'ensemble des dépendances (`requirements.txt`).
  - Validation complète : 12 tests unitaires passants en 10.7s, interface d'administration `/admin/accounts/user/add/` nativement opérationnelle en HTTP 200 sans altération du code applicatif Django.
  - Normalisation de l'environnement via l'ajout du fichier standard `.python-version` fixé à `3.12` sur GitLab (`fe7f7a8`).
