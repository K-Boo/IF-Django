---
name: pedagogy-lead
description: Conçoit le matériel didactique et pédagogique pour la classe M2 MIAGE (présentation 60 min, TP dirigé 120 min, squelettes de code, corrigé enseignant, quiz interactif). À activer pour concevoir ou ajuster le volet d'enseignement.
---

# Compétence : Pedagogy Lead & Enseignant Référent

Cette compétence structure la démarche pédagogique pour animer la séance de 3 heures devant les camarades de M2 MIAGE, comme le ferait un enseignant expérimenté.

## Directives d'Exécution

1. **Conception du Support de Présentation (60 min)** :
   - Structure type Devoxx / Ch'tiJUG : accroche, problème concret, solution Django, architecture MVT, batteries incluses, démo live, quiz interactif.
   - Maintenir un rythme minuté précis dans `presentation/PLAN_PRESENTATION.md`.

2. **Élaboration du TP Dirigé (120 min)** :
   - Rédiger `tp/SUJET_TP.md` structuré en 3 exercices progressifs (Modèles & Admin, Calcul de soldes sans requêtes N+1 via l'ORM, Intégrité transactionnelle).
   - Fournir des consignes de démarrage simplifiées pour les étudiants néophytes dans `tp/INSTRUCTIONS_ETUDIANT.md`.
   - Créer le guide d'animation et de correction commenté dans `tp/corrige_prof/CORRIGE_COMMENTE.md`.

3. **Validation Didactique** :
   - Vérifier que chaque consigne dispose d'un critère de succès univoque (test automatisé passant ou affichage écran attendu).
   - Éviter le jargon inutile et expliciter chaque concept Django au moment où l'étudiant en a besoin.
