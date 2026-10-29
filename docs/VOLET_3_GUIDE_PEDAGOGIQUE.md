# Guide Pédagogique & Explications Techniques — Volet 3

> **Document personnel & confidentiel (Dépôt GitHub Agentique)**  
> Ce document détaille le fonctionnement interne de chaque brique de code du Volet 3 afin de comprendre précisément les mécanismes Django mis en œuvre, préparer vos arguments pour la soutenance et maîtriser l'architecture de votre projet.

---

## 🧭 Vue d'Ensemble du Volet 3

Le Volet 3 a pour mission de parachever l'application « Les Bons Comptes » en couvrant les dernières exigences fonctionnelles et architecturales de l'énoncé officiel du module *Infrastructures & Frameworks* (M2 MIAGE) :
1. **Étape 1 : Clôture du porte-monnaie & Scellage des comptes** *(Validée)*.
2. **Étape 2 : Gestion des remboursements fictifs (« Rembourser (mock) »)** *(À venir)*.
3. **Étape 3 : Scalabilité & Volumétrie (« Think HUGE » avec Pagination et Index BDD)** *(À venir)*.

---

## 🔒 Étape 1 : Clôture Sécurisée du Porte-Monnaie & Verrouillage Métier

### 1. La Situation-Problème & Objectif Métier
Dans une application de gestion de dépenses (comme Tricount ou Splitwise), un événement a une fin (ex: fin des vacances, départ d'une colocation).  
Tant que la cagnotte est `OUVERTE`, n'importe quel membre peut continuer d'ajouter ou de supprimer des dépenses.  
Si les membres commencent à se rembourser alors que d'autres ajoutent encore des frais, les soldes calculés changent en permanence et les comptes ne tombent jamais juste.

**L'objectif de l'Étape 1** :
Permettre à l'administrateur de sceller définitivement la cagnotte en la passant au statut `CLOS`.  
Dès cet instant :
- Plus aucune dépense ne peut être ajoutée.
- Plus aucune dépense ne peut être supprimée.
- Les soldes nets finaux sont gravés dans le marbre pour permettre les remboursements en toute sérénité.

---

### 2. Fonctionnement Technique Détaillé du Code Implémenté

#### A. La Vue de Clôture (`src/apps/wallets/views.py`)
```python
@login_required
@require_POST
def wallet_close(request, wallet_id):
    wallet = get_object_or_404(Wallet, id=wallet_id)

    # 1. Vérification stricte des droits
    membership = WalletMembership.objects.filter(
        wallet=wallet,
        user=request.user,
        status=WalletMembership.Status.ACCEPTED,
        role=WalletMembership.Role.ADMIN,
    ).first()

    if not membership and wallet.creator != request.user:
        raise PermissionDenied("Seul l'administrateur du porte-monnaie peut le cloturer.")

    # 2. Idempotence : si déjà clos, redirection propre
    if wallet.status == Wallet.Status.CLOSED:
        messages.info(request, f"Le porte-monnaie « {wallet.title} » est deja clos.")
        return redirect("wallets:detail", wallet_id=wallet.id)

    # 3. Transaction atomique
    with transaction.atomic():
        wallet.status = Wallet.Status.CLOSED
        wallet.save(update_fields=["status"])

    messages.success(
        request,
        f"Le porte-monnaie « {wallet.title} » a ete cloture avec succes. Les comptes sont desormais scelles !",
    )
    return redirect("wallets:detail", wallet_id=wallet.id)
```

##### Pourquoi ces choix techniques ?
1. **`@require_POST`** :
   - *Pourquoi ?* Une action qui modifie l'état de la base de données (changer un statut, transférer de l'argent) ne doit **JAMAIS** être accessible via une requête HTTP `GET`.
   - Si c'était en `GET`, un robot d'indexation (comme Googlebot) ou le préchargement automatique de liens par un navigateur pourrait accidentellement clôturer une cagnotte en cliquant sur un lien.
   - En imposant `POST`, Django exige également la présence du jeton secret CSRF (`{% csrf_token %}`), protégeant l'action contre les attaques malveillantes.
2. **`raise PermissionDenied` (HTTP 403 Forbidden)** :
   - C'est l'exception standard de Django pour le contrôle d'accès au niveau objet (*Object-Level Permissions*).
   - Si un utilisateur lambda essaie de forger une requête pour clore le pot d'un autre, Django intercepte l'exception et renvoie une réponse HTTP 403 standard.
3. **`with transaction.atomic():`** :
   - Encadre l'opération dans une transaction SQL (`BEGIN ... COMMIT`).
   - `update_fields=["status"]` : Au lieu de réécrire toute la ligne en BDD, Django génère l'instruction SQL minimale et optimisée :  
     `UPDATE wallets_wallet SET status = 'CLOS' WHERE id = '...';`.

---

#### B. La Route URL (`src/apps/wallets/urls.py`)
```python
path("<uuid:wallet_id>/close/", views.wallet_close, name="close"),
```
- Utilise le convertisseur de chemin `<uuid:wallet_id>` pour garantir que seuls des identifiants au format UUID valide déclenchent la vue.
- Nommée `wallets:close` pour être facilement invoquée dans les templates via la balise `{% url 'wallets:close' wallet.id %}`.

---

#### C. L'Interface Utilisateur (`src/templates/wallets/wallet_detail.html`)
L'interface s'adapte dynamiquement selon l'état du porte-monnaie :
1. **Le bouton de clôture** :
   ```html
   {% if is_admin and wallet.status == 'OUVERT' %}
       <form method="post" action="{% url 'wallets:close' wallet.id %}" style="display: inline; margin: 0;" onsubmit="return confirm('Attention : la clôture est définitive...');">
           {% csrf_token %}
           <button type="submit" class="btn btn-danger btn-sm">
               🔒 Clôturer le pot
           </button>
       </form>
   {% endif %}
   ```
   - Affiché **uniquement** si la personne connectée est administratrice du pot et que le statut est encore `OUVERT`.
   - Équipé d'une boîte de dialogue de confirmation JavaScript (`confirm(...)`) pour éviter les clics accidentels.
2. **Le bandeau d'information** :
   Dès que le statut passe à `CLOS`, un bandeau informatif élégant s'affiche en haut de la fiche pour avertir les membres que les comptes sont scellés.
3. **Le verrouillage automatique des dépenses** :
   - Le bouton `+ Ajouter une dépense` disparaît automatiquement.
   - Les boutons `Supprimer` en face des dépenses disparaissent également.
   - Même si un utilisateur malin tente d'envoyer une requête manuelle pour ajouter ou supprimer une dépense, les vues [`apps.expenses.views.expense_create`](file:///c:/Users/hpome/Documents/M2_MIAGE/IF/if-django-2026/src/apps/expenses/views.py) et `expense_delete` contiennent un verrou de sécurité côté serveur qui vérifie `if wallet.status == Wallet.Status.CLOSED:` et rejette la demande avec un message d'erreur.

---

### 3. Les 4 Tests Automatisés (`src/apps/wallets/tests.py`)

Pour respecter la rigueur logicielle du Master MIAGE, 4 tests unitaires couvrent 100% des cas possibles :

1. **`test_wallet_close_by_creator_success`** :  
   Alice (créatrice) envoie un POST sur `/wallets/<id>/close/`.  
   *Résultat attendu* : Redirection HTTP 302 vers la fiche détaillée, statut du pot passé à `CLOS` en base.
2. **`test_wallet_close_by_regular_member_forbidden`** :  
   Bob (simple membre invité) tente de clôturer le pot.  
   *Résultat attendu* : Erreur HTTP 403 Forbidden immédiate, statut du pot maintenu à `OUVERT`.
3. **`test_wallet_close_already_closed_is_idempotent`** :  
   Si la cagnotte est déjà close et que le créateur re-clôture.  
   *Résultat attendu* : Redirection propre avec message d'information sans plantage serveur (*idempotence*).
4. **`test_wallet_close_requires_post`** :  
   Un utilisateur tente d'accéder à l'URL de clôture via une requête HTTP GET (dans la barre d'adresse).  
   *Résultat attendu* : Erreur HTTP 405 Method Not Allowed.

---

### 4. Bilan Qualité
- **Flake8** : 0 erreur de style ou de convention PEP 8.
- **Tests unitaires Django** : 16 tests passants sur 16 (100% de réussite).
- **Git** : Commit traçable `feat(wallets): cloture securisee du porte-monnaie et verrouillage metier` poussé sur GitLab Univ-Lille.

---

## 💸 Étape 2 : Gestion des Remboursements Fictifs (« Rembourser (mock) »)

### 1. La Situation-Problème & Objectif Métier
L'énoncé officiel du sujet stipule textuellement :
> *« Bonus : Calculer qui donne combien à qui (en minimisant les virements) »*  
> *« Rembourser (mock) »*

Jusqu'à présent, l'application calculait le plan optimal de remboursement (ex: « Bob doit verser 25.00 EUR à Alice »), mais **les membres n'avaient aucun moyen d'indiquer qu'ils avaient réglé leur dette** !  
Résultat : les dettes restaient indéfiniment affichées, même après que Bob ait fait son virement bancaire à Alice.

**L'objectif de l'Étape 2** :
1. Permettre d'enregistrer un virement / remboursement (réel ou fictif/mock) en un clic depuis le tableau de bord des soldes.
2. Déduire immédiatement ce remboursement du solde net des deux membres.
3. Mettre à jour en temps réel l'algorithme glouton (si Bob règle l'intégralité de sa dette à Alice, la transaction disparaît du plan et les deux comptes tombent à 0.00 EUR).
4. Conserver un historique complet et traçable des règlements déjà effectués avec possibilité d'annulation si nécessaire.

---

### 2. Fonctionnement Technique Détaillé du Code Implémenté

#### A. Le Modèle `Reimbursement` (`src/apps/expenses/models.py`)
```python
class Reimbursement(models.Model):
    wallet = models.ForeignKey(
        "wallets.Wallet",
        on_delete=models.CASCADE,
        related_name="reimbursements",
        verbose_name="Porte-monnaie",
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reimbursements_sent",
        verbose_name="Emetteur (payeur)",
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reimbursements_received",
        verbose_name="Destinataire (beneficiaire)",
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.01"))],
        verbose_name="Montant rembourse",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date du reglement",
    )
```
- **Relation bilatérale propre** : deux clés étrangères vers `User` (`sender` qui donne l'argent, `receiver` qui le reçoit) reliées à la cagnotte (`wallet`).
- **Sécurité décimale** : `DecimalField(10, 2)` avec validateur positif (`MinValueValidator(0.01)`), évitant toute anomalie de montant nul ou négatif.

---

#### B. Intégration dans le Moteur de Calcul des Soldes (`src/apps/expenses/services.py`)
Pour ne pas introduire de requêtes N+1 et respecter le principe *« Think HUGE »*, les remboursements sont agrégés directement par le SGBD :
```python
# 1. Total des remboursements émis par utilisateur (1 requête SQL GROUP BY)
reimb_sent_aggs = (
    Reimbursement.objects.filter(wallet=wallet)
    .values("sender_id")
    .annotate(total_sent=Sum("amount"))
)

# 2. Total des remboursements reçus par utilisateur (1 requête SQL GROUP BY)
reimb_recv_aggs = (
    Reimbursement.objects.filter(wallet=wallet)
    .values("receiver_id")
    .annotate(total_recv=Sum("amount"))
)

# 3. Formule mathématique exacte du solde net
paid = total_depenses_payees + total_remboursements_emis
share = total_depenses_consommees + total_remboursements_recus
net_balance = paid - share
```

##### La Beauté Mathématique du Système :
Prenons l'exemple où Alice a avancé 100 EUR pour Alice et Bob (50 EUR chacun) :
- **Avant remboursement** :
  - Alice : a payé 100, consommé 50 $ightarrow$ Solde = **+50 EUR** (Créditrice).
  - Bob : a payé 0, consommé 50 $ightarrow$ Solde = **-50 EUR** (Débiteur).
- **Bob clique sur « Rembourser (mock) » de 50 EUR** :
  - Bob a émis 50 EUR $ightarrow$ son `paid` passe à 50 EUR. Solde = $50 - 50 =$ **0.00 EUR** !
  - Alice a reçu 50 EUR $ightarrow$ sa créance est compensée. Solde = $100 - (50 + 50) =$ **0.00 EUR** !
- Les deux membres sont instantanément quittes, et le plan de remboursement se vide automatiquement !

---

#### C. Les Vues Métier (`src/apps/expenses/views.py`)
1. **`reimbursement_create(request, wallet_id)`** :
   - Décorée avec `@login_required` et `@require_POST`.
   - Contrôle d'accès : vérifie que l'émetteur et le destinataire sont tous deux membres actifs du porte-monnaie.
   - Validation stricte : interdit de se rembourser soi-même (`from_user != to_user`) et valide le montant sous `transaction.atomic()`.
2. **`reimbursement_delete(request, reimbursement_id)`** :
   - Permet d'annuler un remboursement en cas d'erreur de saisie.
   - Contrôle d'accès : réservé à l'émetteur, au destinataire ou à l'administrateur du pot.

---

#### D. L'Interface Utilisateur ([`templates/expenses/balances.html`](file:///c:/Users/hpome/Documents/M2_MIAGE/IF/if-django-2026/src/templates/expenses/balances.html))
1. **Bouton d'action directe 1-clic** :
   Dans le tableau des virements suggérés, un bouton vert **« ✓ Rembourser (mock) »** permet de solder une ligne en un clic avec pré-remplissage automatique des montants et des comptes.
2. **Section « Historique des Remboursements Effectués »** :
   Une nouvelle carte récapitule chronologiquement l'ensemble des paiements validés, la date exacte, les acteurs concernés et un bouton pour annuler un remboursement si besoin.

---

### 3. Les Tests Automatisés Dédiés (`ReimbursementTests`)

4 nouveaux tests unitaires complets couvrent l'intégralité du cycle de vie des remboursements :
1. **`test_reimbursement_updates_net_balances_and_plan`** : Vérifie qu'un remboursement compense rigoureusement la dette, amène les soldes à 0.00 EUR et vide le plan d'apurement glouton.
2. **`test_reimbursement_non_member_forbidden`** : Prouve qu'un utilisateur extérieur est refoulé avec une erreur HTTP 403 Forbidden.
3. **`test_reimbursement_self_forbidden`** : Prouve qu'une tentative d'auto-remboursement est rejetée sans créer d'enregistrement en base.
4. **`test_reimbursement_delete_restores_debt`** : Vérifie que l'annulation d'un remboursement restaure immédiatement la dette initiale et réinjecte la ligne dans le plan glouton.

---

### 4. Bilan Qualité
- **Flake8** : 0 erreur de style ou de convention PEP 8.
- **Tests unitaires Django** : **20 tests passants sur 20** (100% de réussite).
- **GitLab** : Commit traçable `feat(expenses): modelisation et enregistrement des remboursements simules` (`ea6864f`) poussé sur la branche `main`.

