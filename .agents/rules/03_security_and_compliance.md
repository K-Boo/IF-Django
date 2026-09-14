# RÈGLE 03 : SÉCURITÉ, CONFORMITÉ ET ZERO-TRUST (2026)

## 1. Prévention des Vulnérabilités (OWASP Top 10 & CWE)
- **Injections (SQL, NoSQL, OS Command, Prompt Injection)** :
  - Utilisation systématique de requêtes préparées (ORMs modernes / Query Builders type Prisma, Drizzle, SQLAlchemy).
  - Validation stricte de tous les schémas d'entrée via des validateurs de typage d'exécution (Zod, Pydantic v2).
  - Jamais de concaténation de chaînes dans des requêtes dynamiques ou des commandes shell.
- **Gestion des Identités et Authentification** :
  - Mots de passe hachés avec Argon2id ou bcrypt (facteur de coût adapté).
  - Tokens JWT signés de manière asymétrique (RS256/EdDSA) avec expiration courte (15 min) et rotation sécurisée des Refresh Tokens (stockés en cookie `HttpOnly`, `SameSite=Strict`, `Secure`).
- **Contrôle d'Accès (Broken Object Level Authorization - BOLA)** :
  - Vérification obligatoire des permissions au niveau ressource (`user.id === resource.ownerId` ou politique RBAC/ABAC formelle) sur chaque endpoint.

## 2. Gestion des Secrets et Données Sensibles
- **Tolérance Zéro pour les Secrets Committés** :
  - Aucun mot de passe, token API, clé privée ou certificat ne doit être versionné.
  - Tout secret doit être injecté via l'environnement (`process.env` / `os.environ`).
  - Un fichier `.env.example` doit répertorier toutes les variables nécessaires sans aucune valeur sensible réelle.
  - Utilisation d'outils d'analyse statique et pré-commit hooks pour bloquer tout push contenant des patterns de clés secrètes.

## 3. Dépendances et Supply Chain Security
- Vérification systématique des vulnérabilités des dépendances (`npm audit`, `pip-audit`, ou scanners SBOM).
- Verrouillage strict des versions (`package-lock.json`, `poetry.lock`, `requirements.txt` avec hashes).
- Pas d'installation de paquets abandonnés ou sans maintenance active.
