# DIRECTIVES MAÎTRESSES : AGENTS POUR LE PROJET M2 MIAGE IF-DJANGO

Ce dossier contient la configuration centrale et les directives impératives pour les agents intervenant sur le projet **IF-Django** (Master 2 MIAGE / IFI - Université de Lille).

---

## 1. Contexte du Projet & Objectifs Académiques

- **Module** : Infrastructures & Frameworks (IF) — Enseignants : Romain Rouvoy & Gaëtan Hasbroucq.
- **Application cible** : « Les Bons Comptes » (Porte-monnaie partagé / gestion de dépenses de groupe type Tricount).
- **Finalité pédagogique** :
  1. Comprendre et illustrer les particularités et forces du framework **Django** (Python) : architecture MVT, ORM puissant, système d'authentification natif, interface d'administration générée, formulaires et validation, sécurité native (*Batteries Included*).
  2. Préparer le matériel pour animer une séance complète de 3 heures devant la classe :
     - **Présentation (60 min)** : Format conférence (style Devoxx / Ch'tiJUG) pour expliquer Django de manière illustrée et interactive.
     - **Atelier / TP Dirigé (120 min)** : Faire coder aux camarades une partie clé et formatrice (calcul de soldes via l'ORM sans requêtes N+1 et intégrité transactionnelle avec `transaction.atomic()`).
     - **Contrainte multi-utilisateurs** : Backend et base de données partagés entre les étudiants du groupe.

---

## 2. Principes Impératifs pour les Agents

1. **Règle du Code Progressif (Interdiction de Coder Prématurément)** :
   - Aucun agent ne doit générer de code applicatif Django complet d'un seul coup.
   - Le code doit être développé de manière incrémentale, en accord avec l'utilisateur, précédé de tests unitaires (TDD).
2. **Didactique et Clarté Enseignante** :
   - Toute explication, énoncé de TP ou support de présentation doit adopter une posture de professeur bienveillant et rigoureux.
   - Les concepts doivent être vulgarisés avec des schémas, des analogies claires et des mises en situation de problèmes concrets (ex: faille de concurrence sous accès simultanés).
3. **Respect du "Django Way"** :
   - Privilégier les outils natifs de Django plutôt que de réinventer la roue ou d'importer des dépendances inutiles.
   - Modèles relationnels clairs, managers personnalisés pour l'encapsulation métier, requêtes ORM optimisées (`select_related`, `prefetch_related`, agrégations SQL).
4. **Dimensionnement ("Think HUGE")** :
   - Concevoir les requêtes et les schémas pour supporter de grandes volumétries (pagination, index BDD, pas de boucles Python sur des querysets massifs).

---

## 3. Rôles Spécialisés Dédiés au Projet

- **Professeur & Concepteur Pédagogique** (`pedagogy-lead`) : Élaboration du TP, des slides, du quiz interactif et des corrigés.
- **Tech Lead Django** (`django-architect`) : Modélisation des données, contrats d'API, requêtes ORM optimisées et conformité Django.
- **Testeur & QA Django** (`django-qa-tester`) : Tests unitaires Django (`TestCase`, `TransactionTestCase`), tests de concurrence et de charge.
- **DevOps Multi-Utilisateurs** (`devops-multiuser`) : Dockerisation, base de données PostgreSQL partagée, CI/CD GitLab et support aux étudiants.
