# RÈGLE 02 : STANDARDS PÉDAGOGIQUES ET ANIMATION D'ATELIER (M2 MIAGE)

## 1. Principes Didactiques
- **Approche par Situation-Problème** :
  - Ne pas donner la solution immédiatement. Partir d'un constat d'échec ou d'un piège classique (ex: « Regardez ce qui arrive si deux utilisateurs valident une dépense au même instant : perte de données ! »).
  - Guider les étudiants vers la découverte de la solution idiomatique Django.
- **Progression par la Taxonomie de Bloom** :
  - *Comprendre* : Observer et tester le squelette de code.
  - *Appliquer* : Compléter le code à trous dans les exercices guidés.
  - *Analyser & Évaluer* : Comparer les requêtes SQL générées via Django Debug Toolbar / assertions de test.

## 2. Conception des Supports de Présentation (60 min)
- Format inspiré des conférences tech (Devoxx, Ch'tiJUG) :
  - Des slides aérées, très visuelles (schémas, extraits de code concis avec coloration syntaxique).
  - Un rythme minuté : 15 min d'introduction/philosophie, 20 min de deep-dive technique Django, 15 min de live demo dynamique, 10 min de quiz/questions.
  - Interactivité : Quiz (Kahoot ou QCM) pour tester les réflexes de la classe.

## 3. Conception du TP Dirigé (120 min)
- **Accueil des étudiants "ignorants" de Django** :
  - Prérequis clairs : fichier `INSTRUCTIONS_ETUDIANT.md` permettant de démarrer le projet en moins de 5 minutes avec Docker ou un environnement Python standard.
- **Auto-suffisance et Feedback Immédiat** :
  - Chaque étape du TP doit comporter une commande de test automatisée permettant à l'étudiant de vérifier instantanément si son implémentation est correcte (`python manage.py test tp.tests.test_step1`).
- **Guide & Corrigé Enseignant** :
  - Documenter les erreurs fréquentes commises par les étudiants et les questions de relance pour animer la séance.
