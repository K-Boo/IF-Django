# Journal de Bord : Initialisation du Projet M2 MIAGE IF-Django

**Module** : Infrastructures & Frameworks (IF) — Master 2 MIAGE / IFI (Université de Lille)  
**Enseignants** : Romain ROUVOY & Gaëtan HASBROUCQ  
**Technologie** : Django (Python)  
**Sujet d'Application** : « Les Bons Comptes » (Porte-monnaie partagé / gestion de dépenses de groupe)  
**Dépôt Agentique (GitHub Privé)** : `git@github.com:K-Boo/IF-Django.git`  
**Dépôt Académique & Code (GitLab Univ-Lille)** : `git@gitlab-ssh.univ-lille.fr:khalil.bouchama.etu/if-django.git`  
**Date d'Initialisation** : 20 Octobre 2026  

---

## 📋 Contexte et Décisions Fondamentales

1. **Rupture avec les paradigmes GLOP** :
   - Abandon total de l'approche microservices d'entreprise générique.
   - Recentrage strict sur les attendus du module **IF-Django** : exploration pédagogique approfondie de Django, transmission du savoir à la promotion (séance de 3 heures : 60 min de présentation magistrale + 120 min de TP dirigé).
2. **Règle d'or de la Phase 1 : Zéro Code Applicatif Métier Prématuré** :
   - La présente phase configure l'ensemble des dépôts, les spécifications fonctionnelles, l'infrastructure partagée, les supports pédagogiques (TP et slides) et les règles d'ingénierie.
   - Le code applicatif Django (modèles, vues, templates, API) sera développé au fur et à mesure avec validation humaine.
3. **Séparation Étanchée et Discrétion Absolue du Dépôt GitLab** :
   - **Dépôt GitHub privé** (`git@github.com:K-Boo/IF-Django.git`) : héberge l'ensemble de l'outillage agentique, prompts des experts virtuels et journal de bord technique.
   - **Dépôt GitLab académique** (`git@gitlab-ssh.univ-lille.fr:khalil.bouchama.etu/if-django.git`) : strictement réservé au code, aux documents pédagogiques et aux livrables étudiants. **Zéro mention d'IA, d'agents, de prompts ou de liens vers GitHub**.

---

## ⏱️ Chronologie Détaillée des Actions Réalisées

### Étape 1 : Cadrage et Alignement des Attentes
- Analyse du sujet officiel `IF-Intro.pdf` du module Infrastructures & Frameworks.
- Identification des exigences du sujet « Les Bons Comptes » : Comptes, Pots partagés, Invitations, Dépenses avec attribution du payeur, Droits de suppression réservés au payeur/créateur, Clôture et calcul des soldes nets, Algorithme de minimisation des dettes, Volumétrie (*Think HUGE*).
- Prise en compte de la contrainte explicite : *« Le backend de l'application doit être partagé entre tous les étudiants du groupe »*.

### Étape 2 : Configuration du Dépôt d'Assistance Agentique (GitHub)
- Nettoyage des reliquats de l'ancienne usine générique.
- Rédaction de `.antigravity/INSTRUCTIONS.md` et de 4 règles spécialisées :
  - `01_django_standards.md` : Idiomes Django, Clean Architecture par apps, intégrité transactionnelle.
  - `02_pedagogical_standards.md` : Didactique de l'atelier, taxonomie de Bloom, détection des pièges étudiants.
  - `03_performance_and_scale.md` : « Think HUGE », élimination des requêtes N+1, agrégations SQL natives.
  - `04_git_and_collaboration.md` : Stratégie de double versionnage GitHub / GitLab.
- Définition de 4 compétences d'assistance : `pedagogy-lead`, `django-architect`, `django-qa-tester`, `devops-multiuser`.
- Connexion au dépôt distant `git@github.com:K-Boo/IF-Django.git` et push sur la branche `main`.

### Étape 3 : Initialisation du Dépôt Académique Partagé (GitLab Univ-Lille)
- Structuration complète du répertoire sans écriture prématurée de code métier Django :
  - `README.md` : Guide d'accueil officiel pour les enseignants, collègues et camarades.
  - `.gitignore`, `.env.example`, `requirements.txt`.
  - `docker-compose.yml` : Configuration d'une base PostgreSQL 16 conteneurisée partagée et pgAdmin.
  - `.gitlab-ci.yml` : Pipeline d'intégration continue GitLab (vérifications flake8 / black / pytest).
- Documentation de cadrage dans `docs/` :
  - `docs/SPECIFICATIONS.md` : Cahier des charges exhaustif du sujet « Les Bons Comptes ».
  - `docs/ARCHITECTURE_DJANGO.md` : Modèle Conceptuel de Données (MCD Mermaid), stratégie de requêtage ORM et isolation transactionnelle.
  - `docs/RAPPORT_SYNTHESE.md` : Trame préparatoire pour le rapport individuel de synthèse (Coeff. 3).
- Matériel pour l'Atelier / TP Dirigé de 120 minutes dans `tp/` :
  - `tp/INSTRUCTIONS_ETUDIANT.md` : Guide de prise en main en moins de 5 minutes pour les étudiants débutants.
  - `tp/SUJET_TP.md` : Sujet complet articulé autour de 3 exercices progressifs (Modèles & Admin, Piège du N+1 & Agrégations SQL, Transactions sous concurrence).
  - `tp/squelettes/` : Répertoire d'accueil des squelettes de code à trous.
  - `tp/corrige_prof/CORRIGE_COMMENTE.md` : Solutions détaillées et guide d'animation pour les présentateurs.
- Matériel pour la Présentation de 60 minutes dans `presentation/` :
  - `presentation/PLAN_PRESENTATION.md` : Conducteur minuté de séance style Devoxx / Ch'tiJUG.
  - `presentation/SLIDES.md` : Diapositives complètes au format Marp / Markdown.
  - `presentation/QUIZ_KAHOOT.md` : Quiz interactif de 5 questions avec explications didactiques.

### Étape 4 : Épuration Intégrale du Dépôt GitLab (Assainissement Anti-Traces)
- Suppression définitive de `JOURNAL_DE_BORD.md` du dépôt GitLab (conservé exclusivement sur GitHub).
- Nettoyage du `README.md` pour retirer tout lien vers GitHub ou mentions d'assistance.
- Nettoyage de `docs/RAPPORT_SYNTHESE.md` pour se concentrer sur l'ingénierie logicielle.
- Scan automatisé par expression régulière confirmant **zéro occurrence de mots-clés IA / agent / prompt / github** dans l'arborescence GitLab.
- Commit et synchronisation sur `git@gitlab-ssh.univ-lille.fr:khalil.bouchama.etu/if-django.git`.
