# Guide de l'Animateur & Corrigé Commenté (Réservé aux Présentateurs)

> **Document confidentiel pour le groupe d'animation**  
> Ce document rassemble les points clés à surveiller, les questions de relance et le corrigé complet pour animer le TP avec aisance.

---

## 💡 Erreurs Fréquentes des Étudiants & Comment les Aider

### Erreur 1 : Utilisation de `FloatField` au lieu de `DecimalField`
- **Symptôme** : L'étudiant utilise `models.FloatField()` pour les montants financiers.
- **Explication pédagogique** : Rappeler le problème d'imprécision des flottants IEEE 754 (ex: `0.1 + 0.2 != 0.3` en mémoire binaire). Dans une application bancaire, chaque centime compte : `DecimalField` est impératif.

### Erreur 2 : Oubli de `select_related` et saturation de la BDD
- **Symptôme** : L'exercice 2 échoue avec `Expected 2 queries, got 501 queries`.
- **Explication pédagogique** : Montrer que l'ORM est « paresseux » (*lazy loading*). Quand on accède à `exp.payer`, Django va chercher les données à la volée. `select_related` force une jointure SQL `INNER JOIN` dès la première requête.

### Erreur 3 : Placer le calcul du total dans une boucle Python
- **Symptôme** : L'étudiant charge tous les objets et fait une boucle `for` en mémoire Python.
- **Explication pédagogique** : Expliquer la différence de performance entre le moteur de base de données C optimisé (PostgreSQL) et l'interpréteur Python. La base de données calcule une somme sur 100 000 lignes en 2 millisecondes.

---

## 🛠️ Corrigé Officiel des Exercices

### Corrigé Exercice 1 : `Expense`
```python
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Expense(models.Model):
    wallet = models.ForeignKey('wallets.Wallet', on_delete=models.CASCADE, related_name='expenses')
    payer = models.ForeignKey(User, on_delete=models.PROTECT, related_name='expenses_paid')
    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.amount} ({self.payer.username})"
```

### Corrigé Exercice 2 : Requêtes Optimisées & Agrégation
```python
from django.db.models import Sum, Value, DecimalField
from django.db.models.functions import Coalesce

def get_wallet_summary_optimized(wallet):
    # 1 seule requête SQL avec jointure
    expenses = Expense.objects.filter(wallet=wallet).select_related('payer')
    
    # Agrégation SQL directe
    total_agg = Expense.objects.filter(wallet=wallet).aggregate(
        total=Coalesce(Sum('amount'), Value(0, output_field=DecimalField()))
    )
    
    # Répartition par payeur en une seule requête SQL (GROUP BY)
    by_payer = (
        Expense.objects.filter(wallet=wallet)
        .values('payer__username')
        .annotate(total_paid=Sum('amount'))
        .order_by('-total_paid')
    )
    
    return {
        'total': total_agg['total'],
        'expenses': expenses,
        'by_payer': by_payer,
    }
```

### Corrigé Exercice 3 : Intégrité Transactionnelle
```python
from django.db import transaction
from django.core.exceptions import PermissionDenied

@transaction.atomic
def close_wallet_safely(wallet_id, user):
    # Verrouillage pessimiste SQL (FOR UPDATE)
    wallet = Wallet.objects.select_for_update().get(id=wallet_id)
    
    if wallet.creator != user:
        raise PermissionDenied("Seul le créateur peut clôturer ce porte-monnaie.")
        
    wallet.status = 'CLOS'
    wallet.save()
    return wallet
```
