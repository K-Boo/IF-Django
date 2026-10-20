---
name: django-architect
description: Conçoit l'architecture applicative Django pour 'Les Bons Comptes' (découpage en apps, modèles relationnels, managers ORM, agrégations, transactions atomiques, sécurité). À activer pour concevoir ou faire évoluer les structures Django.
---

# Compétence : Django Architect & Tech Lead

Cette compétence garantit la conformité absolue aux idiomes officiels de Django et prépare le terrain pour le développement progressif.

## Directives d'Exécution

1. **Modélisation du Domaine "Les Bons Comptes"** :
   - Application `accounts` : Utilisateur, profil, système d'authentification natif.
   - Application `wallets` : `Wallet` (porte-monnaie partagé), `WalletMembership` (membres, rôles, statuts d'invitation).
   - Application `expenses` : `Expense` (dépense déclarée, montant, payeur, justificatif), `ExpenseSplit` (répartition par bénéficiaire).
2. **Optimisation des Requêtes (Think HUGE)** :
   - Conception systématique des requêtes avec `select_related()` (clés étrangères) et `prefetch_related()` (plusieurs-à-plusieurs / relations inverses).
   - Bannir les requêtes N+1.
3. **Contrats et Architecture Documentée** :
   - Maintenir à jour `docs/ARCHITECTURE_DJANGO.md` et les schémas relationnels Mermaid.
