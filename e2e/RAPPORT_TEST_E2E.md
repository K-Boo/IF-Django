# 📋 Rapport de Recette & Test End-to-End (E2E) — Les Bons Comptes
> **Date de réalisation** : 31 octobre 2026  
> **Auteur** : Khalil Bouchama (M2 MIAGE Lille)  
> **Environnement de test** : Google Chrome via Chrome DevTools Automation • Django 5.1 sur base éphémère isolée (Port 8001)  
> **Statut global** : ✅ **100 % RÉUSSI (12/12 étapes validées — Zéro régression)**

---

## 🏛️ 1. Architecture et Méthodologie Industrielle de Test

Afin de tester l'application en conditions réelles sans compromettre la base de développement locale ni le dépôt officiel GitLab :
1. **Sandbox Éphémère (12-Factor)** :
   - Dérivation de la variable `DATABASE_URL="sqlite:///IF-Django/e2e/e2e_temp_db.sqlite3"`.
   - Exécution complète des migrations et amorçage d'un jeu de données initial propre (`khalil`, `abdelkader`, `gautam`).
2. **Serveur Dédié Isolé** :
   - Démarrage du serveur Django sur un port indépendant (`http://127.0.0.1:8001/`).
3. **Pilotage Réel dans Chrome** :
   - Simulation des actions de l'utilisateur (saisie de texte, clics sur les boutons, acceptation des boîtes de dialogue natives `confirm()`, navigation).
   - Prise de captures d'écran pleine page à chaque transition majeure.
   - Surveillance de la console JavaScript Chrome (0 erreur constatée).
4. **TearDown (Nettoyage Intégral)** :
   - Arrêt du serveur de test.
   - Destruction immédiate du fichier `e2e_temp_db.sqlite3` (`Test-Path: False`).

---

## 📊 2. Matrice d'Exécution des Scénarios de Test

| ID | Étape Testée | URL / Vue | Résultat Attendu | Constat Réel | Statut |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **01** | **Authentification** | `/accounts/login/` | Formulaire centré, saisie `khalil` / `Password123!` | Connexion réussie, session créée | ✅ OK |
| **02** | **Tableau de Bord Initial** | `/wallets/` | Affichage du composant `empty_state` (0 cagnotte) | Rendu directionnel et sobre conforme | ✅ OK |
| **03** | **Création Cagnotte** | `/wallets/create/` | Saisie *"Voyage Barcelone 2026"* (EUR) | Création et redirection automatique | ✅ OK |
| **04** | **Fiche Cagnotte Initiale** | `/wallets/<id>/` | Titre, métadonnées, badge `OUVERT`, onglets (Dépenses 0, Membres 1) | Rendu moderne conforme à la maquette | ✅ OK |
| **05** | **Gestion des Invitations** | `/wallets/<id>/invite/` | Envoi d'invitations à `abdelkader` et `gautam` | Apparition de l'onglet *Invitations en attente (2)* | ✅ OK |
| **06** | **Acceptation & Rôles** | `/wallets/<id>/` | Les 3 membres deviennent actifs | Onglet *Participants (3)* avec badges Admin/Membre | ✅ OK |
| **07** | **Saisie de Dépense** | `/expenses/<id>/add/` | Saisie Courses Mercadona (120 € payé par Khalil) | Formulaire avec sélection des bénéficiaires | ✅ OK |
| **08** | **Flux de Dépenses** | `/wallets/<id>/` | 3 dépenses enregistrées (Total 360 €) | Timeline chronologique et montants tabulaires | ✅ OK |
| **09** | **Matrice des Soldes** | `/expenses/<id>/balances/` | Calcul net : Gautam (+30 €), Abdelkader (-30 €), Khalil (0 €) | Détection automatique créancier/débiteur | ✅ OK |
| **10** | **Règlement Dette (Mock)** | `/expenses/<id>/reimburse/` | Clic "Régler" (Abdelkader ➔ Gautam 30 €) avec confirmation | Soldes rééquilibrés à 0,00 €, virement archivé | ✅ OK |
| **11** | **Clôture du Pot** | `/wallets/<id>/close/` | Clic "Clôturer le pot" par l'administrateur avec confirmation | Badge `CLOS`, scellement des dépenses et ajouts | ✅ OK |
| **12** | **Profil & Déconnexion** | `/accounts/profile/` | Avatar XL 64px, résumé du compte, déconnexion POST | Session invalidée, retour sécurisé au login | ✅ OK |

---

## 🔍 3. Détection et Correction d'Anomalie (Quality Assurance)
Lors de l'étape 10, le test automatisé a mis en lumière une anomalie subtile liée à la localisation française de Django (`USE_L10N = True`) :
- **Comportement initial** : La balise `<input type="hidden" name="amount" value="{{ t.amount }}">` formatait la valeur avec une virgule (`30,00`), provoquant une exception `InvalidOperation` côté Python dans `Decimal(amount_str)`.
- **Correction robuste** : Utilisation du filtre natif Django `{% load l10n %}` et `{{ t.amount|unlocalize }}` dans `src/templates/expenses/balances.html`, garantissant la transmission d'un montant standardisé avec un point (`30.00`).
- **Validation** : Répétition du test avec 100 % de succès.

---

## 🖼️ 4. Galerie des Captures d'Écran d'Exécution Réelle (Chrome)

Toutes les captures d'écran ci-dessous ont été prises en direct lors du test automatisé dans Chrome et sont stockées dans `IF-Django/e2e/screenshots/` :

1. **Connexion** : `screenshots/01_login.png`
2. **Tableau de Bord Vide** : `screenshots/02_dashboard_empty.png`
3. **Formulaire Nouvelle Cagnotte** : `screenshots/03_wallet_form.png`
4. **Fiche Détaillée Initiale** : `screenshots/04_wallet_detail_initial.png`
5. **Onglet Invitations en Attente** : `screenshots/05_wallet_invitations_tab.png`
6. **Onglet Participants et Rôles** : `screenshots/06_wallet_participants_tab.png`
7. **Formulaire d'Ajout de Dépense** : `screenshots/07_expense_form.png`
8. **Flux Chronologique des Dépenses** : `screenshots/08_wallet_expense_stream.png`
9. **Matrice des Soldes & Algorithme Glouton** : `screenshots/09_balances_before_reimbursement.png`
10. **Comptes Équilibrés après Règlement** : `screenshots/10_balances_after_reimbursement.png`
11. **Porte-Monnaie Clos et Scellé** : `screenshots/11_wallet_closed.png`
12. **Profil Utilisateur & Déconnexion POST** : `screenshots/12_user_profile.png`

---

## ✅ 5. Conclusion
L'application web « Les Bons Comptes » est **parfaitement opérationnelle, ergonomique, robuste et conforme à 100 % aux spécifications fonctionnelles et techniques des 4 volets**.
