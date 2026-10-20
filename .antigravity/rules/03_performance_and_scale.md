# RÈGLE 03 : PERFORMANCE, REQUÊTAGE ET SCALABILITÉ (« THINK HUGE »)

## 1. Élimination Stricte du Problème N+1
- Tout accès aux relations ForeignKey ou OneToOne dans une boucle ou un template doit impérativement utiliser `select_related()` (jointure SQL `INNER JOIN` ou `LEFT JOIN`).
- Tout accès aux relations ManyToMany ou relations inverses ForeignKey doit utiliser `prefetch_related()` (requête SQL par lot `WHERE id IN (...)`).
- Utilisation de `django-debug-toolbar` ou du décorateur de comptage de requêtes `assertNumQueries` dans les tests automatisés pour prouver l'absence de requêtes N+1.

## 2. Délégation des Calculs au SGBD
- Interdiction de charger 10 000 objets en mémoire Python pour faire une somme ou une moyenne.
- Utiliser systématiquement l'API d'agrégation de Django :
  - `Expense.objects.filter(wallet=w).aggregate(total=Sum('amount'))`
  - `Coalesce(Sum('amount'), Value(0, output_field=DecimalField()))` pour gérer proprement les sommes nulles.

## 3. Pagination & Indexation
- Toutes les listes publiques de dépenses et de porte-monnaies doivent être paginées (via `Paginator` ou les vues génériques `ListView(paginate_by=25)`).
- Déclarer des index explicites dans `Meta.indexes` sur les champs fréquemment filtrés (`wallet_id`, `created_at`, `status`).
