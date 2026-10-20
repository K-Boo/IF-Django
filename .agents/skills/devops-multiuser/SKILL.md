---
name: devops-multiuser
description: Configure l'environnement partagé multi-utilisateurs (Docker Compose, PostgreSQL partagé, .gitlab-ci.yml, variables d'environnement) pour satisfaire la contrainte d'atelier partagé de l'enseignant. À activer pour les problématiques d'infrastructure et de déploiement.
---

# Compétence : DevOps Multi-Utilisateurs & Déploiement

Cette compétence répond à la contrainte explicite du cours : *"Le backend de l'application doit être partagé entre tous les étudiants du groupe"*, et prépare l'infrastructure pour l'ensemble des camarades de promotion.

## Directives d'Exécution

1. **Instance de Base de Données Partagée** :
   - Configurer un service PostgreSQL conteneurisé accessible depuis le réseau local ou hébergé, permettant aux étudiants du groupe de partager les mêmes données de test en temps réel.
2. **Environnement Reproductible en 1 Clic** :
   - Rédiger un `docker-compose.yml` léger permettant à un étudiant d'exécuter `docker compose up` pour être opérationnel immédiatement sans installation fastidieuse de Python / dépendances locales.
3. **Pipeline GitLab CI/CD** :
   - Rédiger `.gitlab-ci.yml` pour le dépôt institutionnel `if-django` : vérification de la syntaxe flake8/black, exécution des tests unitaires Django sous PostgreSQL.
