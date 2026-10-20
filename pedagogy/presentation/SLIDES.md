---
marp: true
theme: default
paginate: true
header: "M2 MIAGE IF — Django & Les Bons Comptes"
footer: "Romain ROUVOY & Gaëtan HASBROUCQ | Université de Lille"
---

# 🐍 Django : The Framework for Perfectionists with Deadlines
### Exploration technique au travers de l'application « Les Bons Comptes »
**Master 2 MIAGE / IFI — Module Infrastructures & Frameworks**

---

# 📌 Au Programme aujourd'hui

1. **La Philosophie Django** : Pourquoi ce framework domine-t-il encore le web ?
2. **L'Architecture MVT** : Déconstruction du modèle.
3. **L'ORM sous le capot** : Entre magie expressive et pièges de performance (*le fameux N+1*).
4. **Django Admin** : Le super-pouvoir caché des équipes de prod.
5. **Démo Live** : « Les Bons Comptes » à l'épreuve de la volumétrie (*Think HUGE*).
6. **Quiz interactif** & Lancement du TP !

---

# ⚡ Pourquoi Django ? La Genèse
- **Né dans une salle de rédaction en 2003** (Lawrence Journal-World).
- **Problème de départ** : Les journalistes voulaient publier des applications web interactives en quelques heures, pas en 6 mois.
- **Philosophie cardinale** : **« Batteries Included »**
  - Authentification ? ✅ Incluse.
  - Interface d'administration ? ✅ Incluse.
  - Système de migrations SQL ? ✅ Inclus.
  - Sécurité native (CSRF, XSS, SQLi) ? ✅ Activée par défaut.

---

# 🏛️ Architecture MVT : Modèle - Vue - Template

```
  [ Requête HTTP ] ────► [ urls.py ] ────► [ views.py ]
                                                │
                                    ┌───────────┴───────────┐
                                    ▼                       ▼
                              [ models.py ]           [ templates ]
                              (Django ORM)             (HTML / Jinja)
                                    │                       │
                                    ▼                       ▼
                              [ PostgreSQL ]          [ Réponse HTTP ]
```

- **Model** : Décrit la donnée et les règles métier (pas seulement une table SQL).
- **View** : Reçoit la requête HTTP, orchestre les modèles, et renvoie la réponse.
- **Template** : Moteur de rendu côté serveur sécurisé et découplé.

---

# 🔍 Le Super-Pouvoir de Django : Son ORM

```python
# Requête expressive et lisible :
depenses_recentes = (
    Expense.objects
    .filter(wallet__status="OUVERT", amount__gte=50)
    .select_related("payer")
    .order_by("-expense_date")[:10]
)
```

- Pas une seule ligne de SQL à écrire pour les cas courants.
- **Migrations déclaratives automatiques** :
  - `python manage.py makemigrations` (Django inspecte vos classes Python).
  - `python manage.py migrate` (Django applique les `ALTER TABLE` correspondants).

---

# ⚠️ Le Piège Mortel en Production : Le Problème N+1

```python
# ❌ DANGEREUX : 1 001 requêtes SQL pour 1 000 dépenses !
expenses = Expense.objects.all()
for exp in expenses:
    print(exp.payer.username)  # 💥 1 requête SQL par tour de boucle !

# ✅ LA SOLUTION DJANGO : 1 seule requête avec jointure
expenses = Expense.objects.select_related('payer')
for exp in expenses:
    print(exp.payer.username)  # 🚀 Donnée déjà en mémoire !
```

> **Règle d'or** : `select_related` pour les ForeignKey (1-1 / N-1) et `prefetch_related` pour les ManyToMany (N-N).

---

# 🛡️ Intégrité Transactionnelle sous Forte Charge

Dans « Les Bons Comptes », la clôture d'un pot et la balance des comptes ne tolèrent aucune incohérence :

```python
from django.db import transaction

@transaction.atomic
def cloturer_porte_monnaie(wallet_id, user):
    # Verrouillage pessimiste de la ligne en base de données
    wallet = Wallet.objects.select_for_update().get(id=wallet_id)
    
    # Vérification stricte des droits
    if wallet.creator != user:
        raise PermissionDenied("Seul le créateur peut clôturer.")
        
    wallet.status = "CLOS"
    wallet.save()
```

---

# 🎩 Django Admin : Productivité Immédiate

```python
# En seulement 3 lignes de code dans admin.py :
@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('title', 'creator', 'status', 'created_at')
    list_filter = ('status', 'currency')
    search_fields = ('title', 'creator__username')
```

- Vous obtenez immédiatement un back-office complet avec recherche, filtres, pagination, gestion des droits et audit trail !

---

# 📱 Démonstration Live : « Les Bons Comptes »

**Scénario de Démonstration** :
1. Connexion d'Alice, Bob et Charlie.
2. Création du pot « Week-end à Amsterdam ».
3. Saisie des dépenses (billets de train, logement, repas).
4. Calcul instantané de la balance par l'ORM.
5. Clôture et calcul de l'algorithme de remboursement minimal.
6. **Crash test "Think HUGE"** : Injection de 10 000 dépenses et observation du temps de réponse !

---

# 🎯 À Vous de Jouer : Le TP Dirigé (2 Heures)

**Votre mission** :
- Cloner le repo : `git clone https://gitlab.univ-lille.fr/khalil.bouchama.etu/if-django.git`
- Lancer l'environnement en 1 commande : `docker compose up -d db`
- Ouvrir `tp/SUJET_TP.md` et coder :
  1. Modélisation et Admin.
  2. Dompter le problème N+1 et l'agrégation SQL.
  3. Sécuriser les transactions sous concurrence.

**Des questions avant de démarrer ? 🚀**
