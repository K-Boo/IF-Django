# Sujet de Travaux Pratiques (TP Dirigé - 120 minutes)
## « Les Bons Comptes » : Maîtriser l'ORM Django, l'Agrégation SQL & les Transactions Atomiques

**Public** : Étudiants de Master 2 MIAGE / IFI (Module Infrastructures & Frameworks)  
**Prérequis** : Notions de programmation objet, bases de données relationnelles SQL  
**Support d'évaluation** : Auto-validation immédiate via tests automatisés fournis  

---

## 🎯 Objectifs Pédagogiques

À la fin de cet atelier de 2 heures, vous serez capables de :
1. Comprendre la modélisation déclarative de Django et l'utilisation de l'interface d'administration automatique.
2. Éviter le piège de performance le plus dévastateur en production : **le problème des requêtes N+1**.
3. Réaliser des calculs d'agrégation complexes (`Sum`, `Coalesce`, expressions `F`) directement délégués au moteur SQL.
4. Sécuriser les opérations financières critiques contre les courses critiques (*race conditions*) grâce aux blocs transactionnels atomiques (`transaction.atomic`) et aux verrous pessimistes (`select_for_update`).

---

## ⏱️ Planning de la Séance (120 minutes)

| Durée | Phase | Objectif |
| :--- | :--- | :--- |
| **00h00 - 00h20** | Prise en main | Cloner le repo, démarrer la BDD PostgreSQL, observer l'admin Django |
| **00h20 - 00h55** | **Exercice 1** | Modélisation des dépenses & Enregistrement dans l'Admin Django |
| **00h55 - 01h35** | **Exercice 2** | Le piège du N+1 & Calcul des soldes via l'ORM Django |
| **01h35 - 01h55** | **Exercice 3** | Intégrité transactionnelle & Verrouillage atomique sous concurrence |
| **01h55 - 02h00** | Débriefing | Bilan avec les animateurs, comparaison des solutions |

---

## 📝 Exercice 1 : Modélisation & Découverte de l'Admin Django (35 min)

### Contexte
Dans l'application « Les Bons Comptes », un porte-monnaie (`Wallet`) regroupe des dépenses (`Expense`).  
Chaque dépense possède un titre, un montant décimal, une date et un compte payeur (`payer`).

### Travail à Réaliser
1. Ouvrez le fichier squelette : `tp/squelettes/models_skeleton.py`.
2. Complétez la définition du modèle `Expense` en veillant aux points suivants :
   - Le montant `amount` doit être un `DecimalField` (2 décimales, 10 chiffres max) pour éviter les erreurs d'arrondi sur les flottants.
   - La relation avec `Wallet` doit utiliser `models.CASCADE`.
   - La relation avec l'utilisateur payeur `payer` doit utiliser `models.PROTECT` (on ne veut pas supprimer une dépense si l'utilisateur supprime son compte).
3. Déclarez une méthode `__str__` claire pour l'affichage dans l'Admin.
4. Activez le modèle dans `admin.py` en ajoutant des filtres de recherche sur le payeur et le porte-monnaie.

### Validation Automatique
Exécutez dans votre terminal :
```bash
python manage.py test tp.tests.test_exercice1
```
> Le test doit afficher `OK`.

---

## 📝 Exercice 2 : Le Piège des Requêtes N+1 et l'Agrégation SQL (40 min)

### La Situation-Problème
Pour afficher la page récapitulative d'un porte-monnaie, un développeur junior a écrit le code suivant dans `views.py` :
```python
def get_wallet_summary_naive(wallet):
    total = 0
    expenses = Expense.objects.filter(wallet=wallet)
    for exp in expenses:
        total += exp.amount
        print(f"Dépense : {exp.title}, payée par {exp.payer.username}")
    return total
```
**Problème** : Si le porte-monnaie contient 1 000 dépenses, Django va émettre **1 001 requêtes SQL** à la base de données (1 pour récupérer la liste, puis 1 requête supplémentaire à chaque itération pour charger `exp.payer`). L'application s'effondre en production !

### Travail à Réaliser
Dans `tp/squelettes/queries_skeleton.py` :
1. Réécrivez la fonction en utilisant **`select_related('payer')`** pour obliger Django à faire une seule jointure SQL `INNER JOIN`.
2. Remplacez la boucle Python de calcul du total par une **agrégation SQL directe** avec la fonction Django `Sum` et `Coalesce` :
   ```python
   Expense.objects.filter(wallet=wallet).aggregate(total=Coalesce(Sum('amount'), Value(0)))
   ```
3. Calculez en une seule requête la somme totale payée par chaque utilisateur grâce à `values('payer__username').annotate(total_paid=Sum('amount'))`.

### Validation Automatique
Exécutez le test de comptage de requêtes :
```bash
python manage.py test tp.tests.test_exercice2
```
> Le test utilise `assertNumQueries(2)`. Il échouera si votre code émet plus de 2 requêtes SQL pour 500 dépenses !

---

## 📝 Exercice 3 : Intégrité Transactionnelle sous Concurrence (20 min)

### La Situation-Problème
Lorsque le créateur clique sur « Clôturer le porte-monnaie », l'état du pot passe à `CLOS` et le calcul final des dettes est scellé.
Que se passe-t-il si un autre utilisateur valide une dépense au centième de seconde précis où la clôture a lieu ?
Sans protection transactionnelle, le calcul de clôture est faussé et le solde ne tombe plus à zéro !

### Travail à Réaliser
Dans `tp/squelettes/transactions_skeleton.py` :
1. Implémentez la fonction `close_wallet_safely(wallet_id, user)` :
   - Encadrez l'opération dans un bloc **`with transaction.atomic():`**.
   - Utilisez **`select_for_update()`** lors de la récupération du `Wallet` pour poser un verrou exclusif sur la ligne SQL le temps de la clôture.
   - Vérifiez que l'utilisateur qui appelle la fonction est bien le créateur du pot (levez `PermissionDenied` sinon).
   - Changez le statut du pot à `CLOS` et enregistrez.

### Validation Automatique
Exécutez le test multithreadé :
```bash
python manage.py test tp.tests.test_exercice3
```
> Le test simule 10 requêtes concurrentes simultanées et vérifie qu'aucune incohérence ne survient.

---

## 🏆 Barème & Critères d'Auto-Évaluation

- [ ] **Exercice 1 validé** : Modèle `Expense` propre et interface Admin opérationnelle (6 pts).
- [ ] **Exercice 2 validé** : Élimination totale des requêtes N+1 et agrégation SQL native (8 pts).
- [ ] **Exercice 3 validé** : Bloc `transaction.atomic()` et `select_for_update()` validés sous concurrence (6 pts).
