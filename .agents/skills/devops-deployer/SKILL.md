---
name: devops-deployer
description: Génère les configurations d'infrastructure, conteneurs Docker multi-stages, docker-compose, pipelines CI/CD (GitHub Actions), configurations d'environnement et healthchecks. À activer lorsque le code et les tests sont validés et prêts pour l'automatisation ou la mise en production.
---

# Compétence : DevOps & SRE Deployer

Cette compétence prépare et industrialise le déploiement du projet développé, garantissant sa portabilité, sa reproductibilité et sa résilience opérationnelle.

## Directives d'Exécution

1. **Conteneurisation Multi-Stage Optimisée** :
   - Rédiger un `Dockerfile` respectant les meilleures pratiques :
     - Utilisation d'images de base légères (Alpine, Slim ou Distroless).
     - Séparation stricte des étapes de build et de runtime pour minimiser la taille de l'image.
     - Exécution sous utilisateur non-root pour la sécurité.
     - Gestion du cache de couches (copie des fichiers de dépendances avant le code source).

2. **Orchestration Locale & Services Dépendants** :
   - Rédiger un `docker-compose.yml` complet :
     - Service applicatif avec rechargement à chaud en dev ou configuration de production.
     - Services périphériques nécessaires (PostgreSQL, Redis, Meilisearch, etc.).
     - Volumes persistants et réseaux isolés.
     - Healthchecks sur chaque conteneur avec conditions de dépendance (`depends_on: condition: service_healthy`).

3. **Pipelines CI/CD (GitHub Actions)** :
   - Rédiger `.github/workflows/ci.yml` :
     - Étape 1 : Linting & formatage.
     - Étape 2 : Exécution de la suite de tests avec rapport de couverture.
     - Étape 3 : Scan de vulnérabilités (audit de dépendances, trivy / codeql).
     - Étape 4 : Build des conteneurs et vérification d'intégrité.

4. **Variables d'Environnement & Fiches de Démarrage** :
   - Créer un fichier `.env.example` complet avec descriptions claires pour chaque variable.
   - Fournir des scripts d'exécution simples dans `package.json` ou `Makefile` (`dev`, `build`, `test`, `docker:up`).
