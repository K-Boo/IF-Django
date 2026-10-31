# 🛡️ Audit de Sécurité Applicatif, Docker & CI/CD (Référentiel OWASP)
> **Projet** : Les Bons Comptes (Django 5.1 / Python 3.12)  
> **Référentiel** : [OWASP Django Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Django_Security_Cheat_Sheet.html) & Bonnes Pratiques DevSecOps  
> **Auteur** : Équipe M2 MIAGE (Audit de fin de projet)  
> **Verdict Global** : **NIVEAU ÉLEVÉ DE SÉCURITÉ MÉTIER (A-)** — *Excellente étanchéité fonctionnelle, renforcements recommandés pour le déploiement de production.*

---

## 📑 Sommaire
1. [Synthèse Exécutive](#1-synthèse-exécutive)
2. [Audit Pilier 1 : Authentification & Gestion des Sessions](#2-audit-pilier-1--authentification--gestion-des-sessions)
3. [Audit Pilier 2 : Contrôle d'Accès & Prévention IDOR](#3-audit-pilier-2--contrôle-daccès--prévention-idor)
4. [Audit Pilier 3 : Injections (SQL, XSS, CSRF, CSV)](#4-audit-pilier-3--injections-sql-xss-csrf-csv)
5. [Audit Pilier 4 : Durcissement des Paramètres Django (`settings.py`)](#5-audit-pilier-4--durcissement-des-paramètres-django-settingspy)
6. [Audit Pilier 5 : Sécurité Docker & Conteneurisation](#6-audit-pilier-5--sécurité-docker--conteneurisation)
7. [Audit Pilier 6 : Sécurité CI/CD & DevSecOps](#7-audit-pilier-6--sécurité-cicd--devsecops)
8. [Plan d'Action & Correctifs Clés en Main](#8-plan-daction--correctifs-clés-en-main)

---

## 1. Synthèse Exécutive

L'application **Les Bons Comptes** présente une conception logicielle solide et respecte nativement les garde-fous fondamentaux du framework Django 5 :
- ✅ **Zéro Injection SQL** : 100 % des requêtes passent par l'ORM paramétré de Django.
- ✅ **Zéro Faille IDOR** : Les cagnottes utilisent des identifiants non prédictibles (UUIDv4) et chaque vue vérifie scrupuleusement l'appartenance de l'utilisateur à la cagnotte ciblée.
- ✅ **Zéro Faille CSRF** : Tous les formulaires HTML intègrent le jeton `{% csrf_token %}` et la déconnexion s'exécute strictement en méthode HTTP `POST`.
- ✅ **Protection XSS** : L'auto-échappement du moteur de gabarits Django est actif partout ; aucun champ utilisateur n'utilise le filtre `|safe`.
- ⚠️ **Points de Durcissement Requis pour la Production Réelle** :
  - Activer les en-têtes de sécurité HTTP (HSTS, cookies Secure, SSL Redirect) lorsque `DEBUG=False`.
  - Fournir un `Dockerfile` durci exécuté avec un utilisateur non-root (`appuser`).
  - Déporter le mot de passe PostgreSQL dans le fichier `.env` au lieu de le laisser en clair dans `docker-compose.yml`.
  - Ajouter une étape de scan de sécurité statique (SAST Bandit / pip-audit) dans `.gitlab-ci.yml`.

---

## 2. Audit Pilier 1 : Authentification & Gestion des Sessions

| Critère OWASP | Analyse du Code | Constat | Note |
| :--- | :--- | :--- | :---: |
| **Complexité des Mots de Passe** | `AUTH_PASSWORD_VALIDATORS` configuré avec 4 validateurs natifs (`UserAttributeSimilarityValidator`, `MinimumLengthValidator` (min 8 car.), `CommonPasswordValidator`, `NumericPasswordValidator`). | ✅ Conforme | **5/5** |
| **Hachage des Mots de Passe** | Utilisation du modèle `AbstractUser` de Django avec algorithme PBKDF2-SHA256 (sel salé de 720 000 itérations). | ✅ Conforme | **5/5** |
| **Déconnexion Sécurisée** | Déconnexion par méthode `POST` (`accounts:logout`) avec jeton CSRF, interdisant le préchargement intempestif ou les attaques Cross-Site. | ✅ Conforme | **5/5** |
| **Attributs des Cookies de Session** | En local, `SESSION_COOKIE_HTTPONLY=True` par défaut. Nécessite `SESSION_COOKIE_SECURE=True` en HTTPS pour empêcher le vol de session réseau. | ⚠️ À durcir en prod | **4/5** |

---

## 3. Audit Pilier 2 : Contrôle d'Accès & Prévention IDOR

L'**Insecure Direct Object Reference (IDOR)** est l'une des vulnérabilités les plus courantes dans les applications financières : un utilisateur modifie l'ID dans l'URL pour accéder à la cagnotte d'un tiers.

### Constat dans le code actuel :
1. **Identifiants Non Énumérables** :
   ```python
   # apps/wallets/models.py
   id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
   ```
   L'identifiant est un UUIDv4 128-bits aléatoire. Une attaque par force brute ou énumération (`/wallets/1/`, `/wallets/2/`) est **mathématiquement impossible**.

2. **Vérification Systématique d'Appartenance (Multi-Tenant Logiciel)** :
   Toutes les vues protégées appliquent une vérification stricte :
   ```python
   # apps/wallets/views.py
   membership = wallet.memberships.filter(
       user=request.user,
       status=WalletMembership.Status.ACCEPTED,
   ).first()
   if not membership and wallet.creator != request.user:
       raise PermissionDenied("Vous ne faites pas partie de ce porte-monnaie.")
   ```
3. **Contrôle d'Accès Basé sur les Rôles (RBAC)** :
   - Seul l'administrateur du pot ou son créateur peut inviter un membre ou clôturer le pot (`is_admin`).
   - Seul le payeur ou le créateur peut supprimer une dépense (`expense_delete`).
   - Seuls les participants concernés ou le créateur peuvent annuler un remboursement (`reimbursement_delete`).

👉 **Score Contrôle d'Accès : 5/5 (Exemplaire)**.

---

## 4. Audit Pilier 3 : Injections (SQL, XSS, CSRF, CSV)

### A. SQL Injection (SQLi)
- **Constat** : 100 % des requêtes dans `services.py` et `views.py` exploitent l'API QuerySet de Django :
  - `Expense.objects.filter(...)`
  - `aggregate(total=Coalesce(Sum('amount'), ...))`
  - `values('payer_id').annotate(...)`
- Aucune méthode `raw()`, `cursor.execute()` ou concaténation de chaînes de caractères n'est présente dans le projet.
- 👉 **Risque SQLi : NUL (0 %)**.

### B. Cross-Site Scripting (XSS)
- Le moteur de template Django active l'auto-échappement contextuel (`autoescape on`).
- Les entrées utilisateur (`wallet.title`, `expense.title`, `description`) sont automatiquement converties en entités HTML (`<` devient `&lt;`).
- L'unique occurrence du filtre `|safe` dans le code concerne `field.help_text|safe` dans `register.html` (textes d'aide statiques internes définis par Django).
- 👉 **Risque XSS : NUL (0 %)**.

### C. Cross-Site Request Forgery (CSRF)
- Le middleware `django.middleware.csrf.CsrfViewMiddleware` est actif dans `MIDDLEWARE`.
- 100 % des formulaires (création, invitations, suppression, ajout de dépenses, remboursement, déconnexion) disposent de `{% csrf_token %}`.
- Les endpoints de modification sont protégés par le décorateur `@require_POST`.
- 👉 **Risque CSRF : NUL (0 %)**.

### D. Injection de Formules CSV (CSV Injection / Formula Injection)
- Dans `apps/wallets/views.py`, la vue `wallet_export_csv` génère le CSV avec `csv.writer` en UTF-8 avec BOM (`\ufeff`).
- Recommandation préventive : Si un utilisateur saisit un titre de dépense débutant par `=`, `+`, `-` ou `@`, certains tableurs (Excel) peuvent tenter d'exécuter une macro.
- 👉 **Mitigation simple** : Préfixer les champs texte commençant par ces caractères d'un guillemet simple `'`.

---

## 5. Audit Pilier 4 : Durcissement des Paramètres Django (`settings.py`)

L'outil d'audit officiel de Django (`python manage.py check --deploy`) a été exécuté.  
En environnement de développement (`DEBUG=True`), Django signale les avertissements normaux de pré-déploiement.

### Recommandation : Profil de Production Automatique
Dans `src/config/settings.py`, nous pouvons automatiser le basculement sécurité dès que `DEBUG=False` :

```python
# Durcissement automatique en production
if not DEBUG:
    # 1. Protection HTTPS & HSTS
    SECURE_SSL_REDIRECT = env.bool("SECURE_SSL_REDIRECT", default=True)
    SECURE_HSTS_SECONDS = env.int("SECURE_HSTS_SECONDS", default=31536000) # 1 an
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

    # 2. Cookies sécurisés
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    CSRF_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    CSRF_COOKIE_SAMESITE = "Lax"

    # 3. En-têtes de protection navigateur
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = "DENY"
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
```

---

## 6. Audit Pilier 5 : Sécurité Docker & Conteneurisation

### A. Analyse du `docker-compose.yml` Actuel
```yaml
environment:
  POSTGRES_DB: bons_comptes_db
  POSTGRES_USER: django_user
  POSTGRES_PASSWORD: django_password   # ⚠️ Mot de passe en clair dans Git
```
- **Risque** : `POSTGRES_PASSWORD` est hardcodé dans le fichier versionné.
- **Correction** : Remplacer par `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-django_password}` et externaliser dans `.env`.

### B. Création d'un `Dockerfile` de Production Durci
Actuellement, aucun `Dockerfile` n'est fourni pour le conteneur applicatif web.
Pour une mise en production selon les standards CIS Benchmark & OWASP :
1. **Multi-Stage Build** : Réduire la taille de l'image finale et éliminer les compilateurs (`gcc`).
2. **Utilisateur non-root (`appuser`)** : Ne jamais exécuter un conteneur en `root`.
3. **Fichier `.dockerignore` étanche** : Exclure `.git`, `.env`, `*.pyc`, `db.sqlite3` pour ne jamais injecter de secrets dans les couches de l'image.

---

## 7. Audit Pilier 6 : Sécurité CI/CD & DevSecOps

### Analyse du Pipeline Actuel (`.gitlab-ci.yml`)
Le pipeline actuel comprend deux étapes : `lint` (Flake8) et `test` (tests unitaires Django).

### Améliorations DevSecOps Recommandées :
1. **Étape SAST (Static Application Security Testing)** :
   - Intégrer `bandit` pour détecter les failles Python (usages non sécurisés de subprocess, fichiers temporaires, assertions en prod).
2. **Étape SCA (Software Composition Analysis)** :
   - Intégrer `pip-audit` pour scanner les vulnérabilités CVE connues dans les dépendances de `requirements.txt`.
3. **Contrôle de Déploiement Django** :
   - Exécuter `python src/manage.py check --deploy` dans le pipeline avec `DEBUG=False`.

---

## 8. Plan d'Action & Livrables Fournis

Pour assurer une transition sans faille vers la production réelle :
1. **Fichier `.dockerignore`** complet prêt à l'emploi.
2. **`Dockerfile` multi-stage sécurisé** avec utilisateur `appuser`.
3. **Mise à jour sécurisée de `docker-compose.yml`** avec variables `.env`.
4. **Pipeline `.gitlab-ci.yml` enrichi** avec job `security-scan` (`bandit` & `pip-audit`).
5. **Configuration `settings.py` durcie** pour le mode production.
