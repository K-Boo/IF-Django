# 🤖 IF-Django : Usine d'Assistance Agentique & Pédagogique

Ce dépôt héberge la **configuration d'assistance agentique** spécialement paramétrée pour le projet universitaire **Infrastructures & Frameworks (IF-Django)** — Master 2 MIAGE / IFI (Université de Lille).

**Dépôt GitHub** : `git@github.com:K-Boo/IF-Django.git`  
**Dépôt Académique Associé (GitLab)** : `git@gitlab-ssh.univ-lille.fr:khalil.bouchama.etu/if-django-2026.git` (`https://gitlab.univ-lille.fr/khalil.bouchama.etu/if-django-2026`)  
**Journal de Bord** : [`JOURNAL_DE_BORD.md`](./JOURNAL_DE_BORD.md)

---

## 🎯 Mission des Agents

1. **Assistance Pédagogique** :
   - Élaboration du support de présentation (60 min) style Devoxx / Ch'tiJUG.
   - Conception du TP dirigé (120 min) pour la classe : situation-problème concrète, exercices progressifs, squelettes de code et corrigé commenté.
2. **Excellence Technique Django** :
   - Conception du porte-monnaie partagé « Les Bons Comptes » selon les règles de l'art (*The Django Way*).
   - Optimisation des requêtes ORM (élimination des requêtes N+1 via `select_related`/`prefetch_related`).
   - Intégrité transactionnelle (`transaction.atomic`) et gestion de la concurrence (`select_for_update`).
3. **Développement Progressif & TDD** :
   - Respect absolu de la règle du code incrémental : zéro code prématuré, développement guidé par les tests étape par étape.

---

## 🏛️ Structure du Dépôt

```text
.
├── .antigravity/                   # Instructions maîtresses et règles obligatoires
│   ├── INSTRUCTIONS.md             # Directives du module M2 IF-Django
│   └── rules/                      # Standards Django, pédagogie, performance et git
├── .agents/skills/                 # Compétences d'assistance
│   ├── pedagogy-lead/              # Concepteur pédagogique (TP & slides)
│   ├── django-architect/           # Architecte technique Django
│   ├── django-qa-tester/           # Testeur qualité et concurrence
│   └── devops-multiuser/           # DevOps et backend partagé
├── JOURNAL_DE_BORD.md              # Retranscription exhaustive de toutes les actions
├── GEMINI.md                       # Directive racine Antigravity
└── README.md                       # Présentation du dépôt agentique
```
