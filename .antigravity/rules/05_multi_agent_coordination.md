# RÈGLE 05 : PROTOCOLE DE COORDINATION MULTI-AGENTS (GROUPE DE 3 ÉTUDIANTS)

Ce protocole régit la synchronisation autonome entre les agents IA assistant les 3 membres du groupe de développement.

---

## 1. Principe Fondamental de Synchronisation
Chaque étudiant du groupe dispose de son propre assistant IA local.  
Le bus de communication et de synchronisation entre les agents est le fichier partagé sur GitLab :  
👉 **`docs/SUIVI_AVANCEMENT.md`**

Tout agent débutant une session pour l'un des 3 membres **DOIT LIRE** ce fichier avant d'entreprendre toute action.

---

## 2. Définition des Rôles & Périmètres d'Intervention

### 👤 Profil Agent — Membre 1 (Comptes, Portes-monnaies & Cadrage)
- **Domaine d'intervention** : `apps/accounts/`, `apps/wallets/`, `presentation/` (Partie 1), `tp/` (Exercice 1).
- **Prérequis** : Aucun (Flux amorceur).
- **Mission** :
  1. Modéliser `User`, `Wallet` et `WalletMembership`.
  2. Écrire les vues de création de pot et gestion des invitations.
  3. Dès finalisation : notifier dans `docs/SUIVI_AVANCEMENT.md` la structure exacte des modèles `User` et `Wallet` pour débloquer l'agent du Membre 2.

### 👤 Profil Agent — Membre 2 (Dépenses, Répartitions & Calculs ORM)
- **Domaine d'intervention** : `apps/expenses/`, `presentation/` (Partie 2), `tp/` (Exercice 2).
- **Prérequis** : Modèles `User` et `Wallet` finalisés par le Membre 1.
- **Vérification automatique** :
  - Lire `docs/SUIVI_AVANCEMENT.md`. Si le statut de `apps.wallets` est encore ⏳ *À démarrer*, travailler sur les tests unitaires préliminaires ou la partie présentation (Partie 2).
  - Dès que `Wallet` est disponible : implémenter `Expense`, `ExpenseShare`, le calcul des soldes et l'algorithme d'équilibrage de dettes.
  - Dès finalisation : notifier dans `docs/SUIVI_AVANCEMENT.md` les fonctions de clôture et de calcul pour débloquer l'agent du Membre 3.

### 👤 Profil Agent — Membre 3 (Performance, Concurrence & Déploiement)
- **Domaine d'intervention** : Optimisations BDD, `transaction.atomic`, `select_for_update`, `docker-compose.yml`, `presentation/` (Partie 3 & Quiz), `tp/` (Exercice 3).
- **Prérequis** : Vues de dépenses et fonction de clôture rédigées par le Membre 2.
- **Mission** :
  1. Auditer les requêtes SQL (chasse aux N+1 avec `assertNumQueries`).
  2. Poser les verrous pessimistes `select_for_update()` sur la clôture et la répartition des dépenses.
  3. Rédiger les tests de charge multithreadés (`TransactionTestCase`).
  4. Dès finalisation : mettre à jour `docs/SUIVI_AVANCEMENT.md`.

---

## 3. Règle de Mise à Jour du Registre Partagé

Tout agent venant de terminer un incrément de code pour son membre **DOIT OBLIGATOIREMENT** ajouter une entrée dans `docs/SUIVI_AVANCEMENT.md` en respectant le template suivant :

```markdown
### [YYYY-MM-DD HH:MM] — [Nom du Livrable]
- **Auteur** : Membre X
- **Périmètre traité** : [ex: apps.wallets / Exercice 1]
- **Ce qui a été réalisé et testé** : [description précise des tests passants]
- **Contrats & Objets désormais disponibles pour les autres** :
  - `ModelName` avec champs (champ1, champ2)
  - Méthode / Endpoint `function_name()`
- **Ce qui est débloqué pour les autres membres** :
  - [ex: Membre 2 peut désormais importer Wallet dans apps/expenses/models.py]
```

---

## 4. Consigne Absolue de Discrétion sur le Dépôt GitLab
- Ne jamais injecter de métadonnées agentiques, de mentions d'IA, de prompts ou de balises LLM dans les fichiers poussés sur GitLab.
- Les messages de commits Git doivent respecter la convention standard : `feat(...)`, `test(...)`, `fix(...)`, `docs(...)`.
