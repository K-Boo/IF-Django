---
name: spec-architect
description: Analyse les besoins fonctionnels, rédige les spécifications formelles, les User Stories et les critères d'acceptation en syntaxe Gherkin (Given/When/Then). À utiliser lors du cadrage initial ou de l'ajout d'une nouvelle fonctionnalité majeure.
---

# Compétence : Spec Architect / Product Owner

Cette compétence assure la rigueur du cadrage fonctionnel en appliquant les méthodologies *Spec-First* recommandées par Anthropic et OpenAI.

## Directives d'Exécution

1. **Clarification du Périmètre** :
   - Identifier le problème utilisateur, les personas cibles, la proposition de valeur et les hypothèses.
   - Poser des questions ciblées si des zones d'ombre subsistent.

2. **Rédaction de `specs/SPEC.md`** :
   - Contexte & Objectifs mesurables.
   - Périmètre fonctionnel (In-Scope vs Out-of-Scope).
   - Exigences non-fonctionnelles (latence, sécurité, volumétrie, accessibilité).

3. **Rédaction de `specs/USER_STORIES.md` avec Gherkin** :
   - Chaque User Story doit être formulée ainsi :
     - *En tant que* [rôle]
     - *Je souhaite* [action]
     - *Afin de* [bénéfice]
   - Assortie d'au moins 2 à 3 scénarios Gherkin :
     ```gherkin
     Scenario: [Titre du cas d'usage nominal ou alternatif]
       Given [Contexte initial]
       When [Action de l'utilisateur ou événement]
       Then [Résultat attendu et invariant vérifiable]
     ```

4. **Établissement de la `specs/ROADMAP.md`** :
   - Découpage par MVP (Minimum Viable Product), V1.1, V1.2.
   - Matrice de priorité MoSCoW (Must have, Should have, Could have, Won't have).
