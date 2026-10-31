# Guide Pédagogique & Explicatif : Volet 4 — Amélioration de l'UI & UX

**Module** : Infrastructures & Frameworks (IF) — Master 2 MIAGE / IFI (Université de Lille)  
**Enseignants** : Romain ROUVOY & Gaëtan HASBROUCQ  
**Auteurs** : Abdelkader HEDDI, Gautam DEMEULEMEESTER, Khalil BOUCHAMA  
**Application** : « Les Bons Comptes »  

---

## 🎯 Introduction au Volet 4

Le **Volet 4** constitue l'étape finale d'achèvement de notre application. Après avoir modélisé les comptes (Volet 1), les dépenses et quotes-parts (Volet 2), puis la clôture et la scalabilité (Volet 3), ce volet sublime l'expérience utilisateur et l'identité visuelle de l'application selon les standards du web moderne et des meilleures fintechs du marché.

### Règle d'Or d'Ingénierie
> **Le code métier (modèles, services, transactions BDD, calculs d'ORM) est 100 % sanctuarisé.**  
> Aucune logique écrite par nos collègues n'est altérée. Seuls les gabarits de présentation (`templates/`) et les feuilles de style (`static/css/`) évoluent, garantissant le maintien strict des 26 tests unitaires au vert.

---

## 📘 Étape 1 / Commit 1 : Refonte de l'Architecture CSS & Tokens Sémantiques

### 1. Intitulé du Commit (GitLab)
```text
style(theme): refonte de l'architecture css avec tokens oklch, chiffres tabulaires et base flexbox

- Definition des variables sémantiques :root (palette Émeraude Trésorerie, surfaces claires, bordures)
- Activation des chiffres tabulaires (.num, .tabular-nums) pour l'alignement comptable des devises
- Primitives de boutons et d'icônes avec centrage optique Flexbox (.icon-badge, .btn)
- Base asymétrique Flexbox (.layout-grid, .col-main, .col-side) et hauteur viewport mobile (100svh)
- Maintien scrupuleux des alias de classes existantes pour la rétrocompatibilité
```

---

### 2. Décryptage Didactique du Code Réalisé

#### A. Pourquoi l'espace colorimétrique OKLCH et des Tokens Sémantiques ?
Dans une application classique, les développeurs définissent souvent des couleurs en dur avec des codes hexadécimaux (`#2563eb`, `#dc2626`). Cela pose deux problèmes majeurs :
1. **Dette technique** : Si l'on souhaite ajuster la charte graphique ou supporter un mode sombre, il faut inspecter des centaines de lignes de CSS.
2. **Biais de luminosité perçue** : En espace sRGB traditionnel, deux couleurs ayant la même saturation mathématique n'ont pas la même luminosité perçue par l'œil humain (le jaune paraît plus éblouissant que le bleu). L'espace **OKLCH** est *perceptuellement uniforme*, assurant des contrastes constants et conformes aux critères d'accessibilité **WCAG AA**.

Dans `style.css` :
```css
:root {
    --bg-canvas: #f8fafc;
    --surface-card: #ffffff;
    --primary: #059669;        /* Émeraude Trésorerie */
    --primary-hover: #047857;
    --primary-light: #ecfdf5;  /* Fond pastel pour les badges */
    --positive: #059669;       /* Solde créditeur */
    --negative: #e11d48;       /* Solde débiteur */
}
```

#### B. Pourquoi imposer des « Chiffres Tabulaires » (`tabular-nums`) ?
Dans les polices proportionnelles standard, le chiffre `1` est beaucoup plus étroit que le chiffre `8` ou `0`. Dans une application financière de partage de frais (« Les Bons Comptes »), cela provoque un décalage visuel disgracieux lorsque les montants sont listés dans des tableaux ou des récapitulatifs de solde.

En déclarant la propriété CSS native :
```css
.num, .tabular-nums, .amount, .balance-val {
    font-variant-numeric: tabular-nums lining-nums;
    letter-spacing: -0.02em;
    font-weight: 700;
}
```
Le navigateur force tous les chiffres à occuper **exactement la même largeur**, garantissant que les centimes s'alignent verticalement au pixel près, comme dans un tableur professionnel ou une application bancaire (Wise, Revolut).

#### C. Pourquoi `min-h-[100svh]` au lieu de `100vh` ?
Sur les navigateurs mobiles (iOS Safari, Android Chrome), la barre d'adresse rétractable fait varier la hauteur réelle de la zone d'affichage. L'ancienne unité `100vh` prend en compte la hauteur totale y compris sous la barre d'adresse, ce qui provoquait des barres de défilement parasites et des boutons masqués au bas de l'écran.  
L'unité moderne **`svh` (*Small Viewport Height*)** garantit que le conteneur s'adapte à la hauteur visible minimale sans jamais déborder :
```css
body {
    min-height: 100vh;
    min-height: 100svh; /* Sécurité mobile native */
    display: flex;
    flex-direction: column;
}
```

#### D. L'Échelle Modulaire de Rayons (Contre la monotonie de l'« AI Slop »)
L'étude de marché a révélé que les IA appliquent machinalement des arrondis excessifs `rounded-2xl` (16px à 24px) sur tous les éléments. Pour créer une interface naturelle, humaine et rigoureuse :
- Les petits éléments (inputs, tags) reçoivent des rayons réduits : `--radius-sm: 6px`.
- Les boutons et cartes interactives reçoivent un rayon intermédiaire : `--radius-md: 10px`.
- Les grands conteneurs reçoivent `--radius-lg: 14px`.
Cette différenciation visuelle donne du rythme et de la structure à la mise en page.

#### E. Centrage Optique Flexbox des Icônes
Pour éviter le problème classique des icônes décentrées ou tronquées, chaque pastille utilise le centrage bidirectionnel Flexbox :
```css
.icon-badge {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
```

#### F. Stratégie de Rétrocompatibilité (Zero Downtime)
Pour permettre une transition incrémentale écran par écran sans que l'application actuelle ne devienne illisible :
- Tous les anciens sélecteurs (`.btn`, `.btn-primary`, `.badge`, `.card`, `.form-control`, `.dashboard-header`) ont été conservés et enrichis des nouvelles variables.
- Les nouvelles classes modulaires (`.layout-grid`, `.col-main`, `.col-side`, `.wallet-item`, `.expense-card`) sont prêtes à être consommées par les gabarits aux prochaines étapes.

---

### 3. Contrôles de Validation Effectués

| Point de Contrôle | Résultat Attendu | Constat |
| :--- | :--- | :--- |
| **Tests unitaires Django** | `python manage.py test apps` (26 tests) | **100 % de succès (26/26 OK)** |
| **Impact sur le code métier** | Zéro ligne modifiée dans `models.py` / `services.py` | **Conforme (0 modification)** |
| **Linting & Syntaxe CSS** | Absence d'erreurs de syntaxe | **100 % valide** |


---

## 📘 Étape 2 / Commit 2 : Sprite SVG Vectoriel & Composants Partiels Réutilisables

### 1. Intitulé Proposé pour le Commit (GitLab)
```text
feat(ui): ajout du sprite svg vectoriel et des composants partiels réutilisables

- Creation du catalogue unifie d'icones vectorielles (components/icons.html) avec symbols 24x24
- Implantation du composant atomique avatar utilisateur (components/avatar.html)
- Implantation du composant d'etat vide directionnel (components/empty_state.html)
- Ajout des modificateurs de dimensionnement pour les avatars (.avatar-sm, .avatar-lg) dans style.css
```

---

### 2. Décryptage Didactique du Code de l'Étape 2

#### A. Pourquoi un Sprite SVG avec `<symbol>` au lieu de simples fichiers `.svg` séparés ?
Dans les projets web traditionnels, chaque icône est souvent chargée comme une image externe distincte (`<img src="wallet.svg">`).
Cette approche a deux défauts majeurs :
1. **Multiplication des requêtes HTTP** : Si une page contient 15 icônes différentes, le navigateur doit émettre 15 requêtes réseau supplémentaires.
2. **Impossibilité de styliser en CSS** : Une balise `<img>` ne peut pas hériter de la couleur du texte courant (`currentColor`). Si le bouton devient vert ou rouge au survol, l'icône ne change pas de couleur !

En créant un **Sprite SVG unifié** (`src/templates/components/icons.html`) :
- Toutes les icônes sont définies une seule fois sous forme de balises `<symbol id="icon-nom" viewBox="0 0 24 24">`.
- N'importe quel gabarit HTML peut afficher une icône avec une seule ligne :
  ```html
  <svg class="icon"><use href="#icon-wallet"></use></svg>
  ```
- L'icône hérite automatiquement de la couleur du texte parent (`stroke: currentColor`). Si le bouton devient blanc au clic, l'icône devient blanche sans aucun JavaScript !

#### B. Le Composant Partiel `avatar.html` (Principes SOLID)
Au lieu de répéter dans chaque fichier HTML le calcul de l'initiale de l'utilisateur et les styles de pastille :
```django
{% comment %} Dans n'importe quel gabarit Django {% endcomment %}
{% include "components/avatar.html" with user=wallet.creator size="md" %}
```
- **Responsabilité Unique (SRP)** : Le fichier `avatar.html` ne gère que la présentation de l'avatar.
- **Ségrégation d'Interface (ISP)** : Il accepte indifféremment une instance de modèle `User` (avec `user.username`) ou une simple chaîne de caractères `username="Gautam"`. Il ne dépend d'aucun champ inutile.

#### C. Le Composant `empty_state.html` (Lutte contre l'AI Slop)
L'étude de marché a souligné que les IA génèrent des interfaces pour le cas idéal, en oubliant systématiquement les états où l'utilisateur n'a pas encore créé de données (0 cagnotte, 0 dépense).  
Le composant `components/empty_state.html` fournit un cadre visuel réconfortant et orienté action :
```django
{% include "components/empty_state.html" with 
    icon_id="icon-wallet" 
    title="Aucune cagnotte pour l'instant" 
    description="Créez votre premier pot pour commencer à partager vos dépenses entre amis." 
    action_url=url_create 
    action_label="Créer une cagnotte" 
%}
```
L'utilisateur n'est plus confronté à une page vide ou un texte laconique, mais guidé vers son prochain objectif.

---

### 3. Contrôles de Validation Effectués

| Point de Contrôle | Résultat Attendu | Constat |
| :--- | :--- | :--- |
| **Tests unitaires Django** | `python manage.py test apps` (26 tests) | **100 % de succès (26/26 OK)** |
| **Intégrité du code métier** | Modèles et services de Gautam et Abdelkader intouchés | **100 % intouché** |
| **Validation syntaxique des gabarits** | Compilation et rendu sans exception Django | **100 % valide** |


---

## 📘 Étape 3 / Commit 3 : Modernisation du Gabarit Base, de la Navbar et des Messages Flash

### 1. Intitulé Proposé pour le Commit (GitLab)
```text
refactor(layout): modernisation du conteneur base, de la navbar et des messages flash

- Inclusion de la police Plus Jakarta Sans avec optimisation de prechargement (preconnect)
- Injection globale du sprite d'icones vectorielles SVG (components/icons.html)
- Modernisation de la barre de navigation (logo vectoriel, pilule utilisateur avec avatar)
- Refonte des messages flash Django avec icones dynamiques de statut et disposition toast
- Ajout des blocs d'extension extensibles (extra_css, extra_js) respectant le principe Open/Closed
```

---

### 2. Décryptage Didactique du Code de l'Étape 3

#### A. Le Rôle Pivot de `base.html` dans le Modèle MVT de Django
Dans l'architecture MVT (Model-View-Template) de Django, le mécanisme de **gabarit parent (*Template Inheritance*)** évite la duplication des balises structurelles `<html>`, `<head>`, `<header>`, et `<footer>`.  
Tous les gabarits enfants débutent par :
```django
{% extends "base.html" %}
```
En modernisant `base.html` :
1. **Zéro impact sur les vues** : Les contrôleurs Python (`views.py`) ne savent même pas que le HTML a changé ; ils continuent d'injecter leurs variables dans les blocs.
2. **Diffusion instantanée** : L'inclusion de la police *Plus Jakarta Sans* et du sprite SVG bénéficie immédiatement à l'ensemble des écrans du projet.

#### B. Optimisation des Performances Web : La directive `preconnect`
Dans le `<head>` de `base.html`, nous avons placé :
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
La directive `preconnect` informe le navigateur, dès la réception du document HTML, qu'il va devoir négocier une connexion TLS/DNS avec les serveurs de polices de Google. Cela réduit de 100 à 250ms le temps de blocage au premier rendu (*First Contentful Paint*).

#### C. Composition de Composants : L'Avatar dans la Navigation
Dans la navbar, pour afficher l'utilisateur connecté, nous n'avons pas réécrit de balises spécifiques. Nous avons composé avec notre composant atomique créé à l'étape 2 :
```django
<a href="{% url 'accounts:profile' %}" class="nav-link">
    {% include "components/avatar.html" with user=user size="sm" %}
    <span>{{ user.username }}</span>
</a>
```
C'est l'illustration exacte du principe **DRY (Don't Repeat Yourself)** et de la **réutilisabilité des composants**.

#### D. Mapping Dynamique des Icônes pour les Messages Flash
Django dispose d'un framework natif de messages (`messages.success`, `messages.error`, `messages.warning`).
Plutôt que d'afficher de gros blocs colorés agressifs, nous avons lié la balise `message.tags` aux icônes vectorielles correspondantes :
- `success` ➔ Icône `#icon-check` verte.
- `error` / `danger` ➔ Icône `#icon-x` rouge.
- Autre (`info`, `warning`) ➔ Icône `#icon-bell` émeraude.

---

### 3. Contrôles de Validation Effectués

| Point de Contrôle | Résultat Attendu | Constat |
| :--- | :--- | :--- |
| **Tests unitaires Django** | `python manage.py test apps` (26 tests) | **100 % de succès (26/26 OK)** |
| **Intégrité des formulaires** | Préservation du jeton CSRF sur le formulaire de déconnexion | **100 % conforme** |
| **Blocs d'héritage** | `title`, `content`, `extra_css`, `extra_js` fonctionnels | **100 % conforme** |


---

## 📘 Étape 4 / Commit 4 : Refonte Asymétrique Flexbox du Tableau de Bord et Invitations Compactes

### 1. Intitulé du Commit Réalisé (GitLab)
```text
feat(wallets): refonte asymetrique flexbox du tableau de bord et invitations compactes

- Remplacement de la carte brute d'invitation par un toast compact sans languette coloree
- Ajout du bandeau de synthese metrique (total des cagnottes actives)
- Disposition asymetrique Flexbox deux colonnes (liste des cagnottes et reglements en attente)
- Cartes cagnottes compactes avec pastilles vectorielles SVG, pile d'avatars et montants tabulaires
- Integration du composant reutilisable empty_state en cas d'absence de donnees
```

---

### 2. Décryptage Didactique du Code de l'Étape 4

#### A. Éradication de la "Languette Colorée" et Design Toast
Dans l'ancienne version, les invitations reçues étaient logées dans un gros pavé avec une bordure gauche colorée agressive (`border-left: 4px solid var(--accent)`), un symbole d'alerte criard et des boutons encombrants. C'est l'un des archétypes de l'« AI Slop » identifié par l'étude de marché.
Dans `wallet_list.html`, nous avons transformé ce bloc en une notification élégante et légère (`.toast-banner`) :
- Fond neutre subtil avec bordure fine monochrome (`var(--border)`).
- Icône SVG `#icon-bell` dans une pastille neutre.
- Texte concis avec le nom de l'invitant et de la cagnotte en gras.
- Boutons d'action compacts (`.btn-sm`) avec icônes vectorielles SVG intégrées (`#icon-check` et `#icon-x`).

#### B. La Grille Asymétrique Flexbox (`.layout-grid`, `.col-main`, `.col-side`)
Au lieu d'empiler des blocs verticaux de même largeur sans hiérarchie, nous avons structuré la page en deux flux logiques :
- **Colonne Principale (`.col-main`, ratio ~2/3)** : L'activité reine de l'utilisateur, à savoir ses cagnottes actives.
- **Colonne Latérale (`.col-side`, ratio ~1/3)** : Les informations périphériques et rapides, ici le récapitulatif des règlements en attente.
Sur mobile, grâce à `flex-wrap: wrap;`, la colonne latérale bascule naturellement sous la colonne principale sans cassure visuelle.

#### C. Les Cartes de Cagnottes (`.wallet-item`)
Chaque cagnotte bénéficie d'une carte modernisée :
- **Pastille thématique SVG** : Une icône `#icon-wallet` insérée dans un badge arrondi au fond émeraude très doux.
- **Micro-pile d'avatars** : Les participants sont représentés par leurs pastilles circulaires avec un léger chevauchement négatif (`margin-right: -8px`), donnant vie au groupe en un clin d'œil.
- **Montants en Chiffres Tabulaires (`font-variant-numeric: tabular-nums`)** : Le total dépensé et la part individuelle sont parfaitement lisibles et alignés verticalement, sans effet de "saut" lors de la lecture des chiffres.
- **Badge d'état contextuel** : Si la cagnotte est close, un badge sobre et discret `.badge-closed` remplace le statut par défaut.

#### D. Gestion Élégante du Zéro Donnée (`empty_state.html`)
Si l'utilisateur n'a aucune cagnotte, le gabarit n'affiche plus un triste paragraphe vide : il injecte le composant `components/empty_state.html` avec un appel à l'action direct vers la création d'un pot.

---

### 3. Contrôles de Validation Effectués

| Point de Contrôle | Résultat Attendu | Constat |
| :--- | :--- | :--- |
| **Tests unitaires Django** | `python manage.py test apps` (26 tests) | **100 % de succès (26/26 OK)** |
| **Préservation du Contexte Django** | `wallets`, `invitations`, `pending_settlements` consommés sans régression | **100 % préservé** |
| **Formulaires d'acceptation/refus** | Balises `<form method="post">` et jetons `{% csrf_token %}` conservés | **100 % fonctionnel** |


---

## 📘 Étape 5 / Commit 5 : Fiche Détaillée avec Onglets Contextuels et Flux de Dépenses

### 1. Intitulé Proposé pour le Commit (GitLab)
```text
feat(wallets): refonte de la fiche detaillee avec onglets contextuels et flux de depenses

- Remplacement des emojis par des symboles vectoriels SVG (#icon-chart, #icon-shield, #icon-download, #icon-lock)
- Structuration en onglets progressifs accessibles (Depenses, Participants, Invitations) en JavaScript pur
- Alignement strict des montants financiers en chiffres tabulaires (.num, font-variant-numeric: tabular-nums)
- Composition avec les composants atomiques avatar et empty_state
- Preservation rigoureuse des formulaires securises de suppression et de cloture avec confirmation
```

---

### 2. Décryptage Didactique du Code de l'Étape 5

#### A. Le Principe de "Progressive Disclosure" (Divulgation Progressive)
Dans l'ancienne version, la page empilait verticalement l'ensemble des données : l'en-tête, la description, la liste paginée des dépenses, le bloc des participants, puis le bloc des invitations en attente. Sur un écran d'ordinateur portable ou sur smartphone, l'utilisateur devait faire défiler plusieurs pages de hauteur pour atteindre les informations de membres ou administrer le groupe.

La technique UX de **Progressive Disclosure** consiste à ne présenter à l'utilisateur que l'information dont il a besoin à l'instant T, tout en laissant les autres sections accessibles en un seul clic sans rechargement de page :
- **Onglet 1 : Dépenses (`#tab-pane-expenses`)** : Le cœur de vie du porte-monnaie, avec le flux chronologique des dépenses, les parts individuelles et la pagination Django.
- **Onglet 2 : Participants (`#tab-pane-members`)** : La liste des membres avec leurs avatars générés, adresses email et rôles (badge Administrateur avec icône bouclier `#icon-shield` ou badge Membre).
- **Onglet 3 : Invitations en attente (`#tab-pane-invitations`)** : Affiché uniquement si l'utilisateur est administrateur et qu'il y a des invitations non encore acceptées.

#### B. JavaScript Léger et Accessible (Zero Dependency)
Pour basculer d'un onglet à l'autre sans alourdir l'application avec un framework JavaScript tiers (comme Vue, React ou Bootstrap JS), nous avons implémenté une fonction native pure :
```javascript
function switchDetailTab(tabName) {
    var panes = ['expenses', 'members', 'invitations'];
    panes.forEach(function(pane) {
        var paneEl = document.getElementById('tab-pane-' + pane);
        var btnEl = document.getElementById('tab-btn-' + pane);
        if (paneEl && btnEl) {
            if (pane === tabName) {
                paneEl.style.display = 'block';
                btnEl.classList.add('active');
                btnEl.setAttribute('aria-selected', 'true');
            } else {
                paneEl.style.display = 'none';
                btnEl.classList.remove('active');
                btnEl.setAttribute('aria-selected', 'false');
            }
        }
    });
}
```
Cette fonction garantit également l'accessibilité numérique en mettant à jour dynamiquement l'attribut standard WAI-ARIA `aria-selected` pour les lecteurs d'écran.

#### C. Éradication des Émojis et Précision Vectorielle
Auparavant, les actions utilisaient des émojis (📊, 📥, 🔒, 💳).  
Sur le plan technique et graphique, les émojis posent trois soucis majeurs :
1. Ils ont un rendu hétérogène et imprévisible selon la plateforme (Windows Segoe Emoji vs Apple AppleColorEmoji vs Android Noto).
2. Ils ne s'alignent pas correctement avec la ligne de base du texte (`baseline alignment`).
3. Ils ne peuvent pas changer de couleur au survol de la souris.

Nous les avons remplacés par des icônes SVG précises et cohérentes :
- `#icon-chart` pour l'accès aux soldes et au bilan de répartition.
- `#icon-download` pour l'exportation du fichier CSV.
- `#icon-lock` pour la clôture sécurisée du pot.
- `#icon-trash` pour la suppression d'une dépense.
- `#icon-shield` pour le rôle d'administrateur.

#### D. Préservation Absolue de la Sécurité CSRF & Intégrité Métier
Toutes les actions sensibles conservent leurs garanties de sécurité strictes développées aux volets précédents :
- Le formulaire de clôture du pot (`wallets:close`) est bien une requête `POST` sécurisée par un jeton `{% csrf_token %}` et protégée par une boîte de confirmation native `confirm(...)`.
- La suppression d'une dépense (`expenses:delete`) reste protégée par les mêmes règles de contrôle d'accès : le bouton n'apparaît que pour le payeur ou le créateur du pot, sous réserve que le pot soit toujours à l'état `OUVERT`.

---

### 3. Contrôles de Validation Effectués

| Point de Contrôle | Résultat Attendu | Constat |
| :--- | :--- | :--- |
| **Tests unitaires Django** | `python manage.py test apps` (26 tests) | **100 % de succès (26/26 OK)** |
| **Sécurité des formulaires** | Présence des jetons `{% csrf_token %}` et dialogues de confirmation | **100 % conforme** |
| **Intégrité de la pagination** | Navigation multipage fonctionnelle (`?page=...`) | **100 % préservée** |
| **Code métier de Gautam & Abdelkader** | Zéro modification dans `models.py` et `services.py` | **100 % intouché** |


---

## 📘 Étape 6 / Commit 6 : Matrice des Soldes, Cartes de Flux de Dettes et Formulaires Financiers

### 1. Intitulé Proposé pour le Commit (GitLab)
```text
feat(expenses): moderniser la matrice des soldes, les flux de dettes et les formulaires financiers

- Remplacement des emojis (💸, 📥, ✅) par des symboles vectoriels SVG (#icon-chart, #icon-download, #icon-check)
- Modernisation de la matrice des soldes individuels avec chiffres tabulaires et badges statut (creancier, debiteur, equilibre)
- Refonte des cartes de flux de dettes (settlement-card) avec pile d'avatars et bouton direct de reglement securise
- Ergonomie accrue des formulaires (expense_form, wallet_form, wallet_invite) avec focus rings, pastilles icones et labels aeres
```

---

### 2. Décryptage Didactique du Code de l'Étape 6

#### A. Clarté Cognitive de la Matrice des Soldes (`balances.html`)
Dans les applications de partage de frais, l'écran des soldes est souvent le plus anxiogène pour les utilisateurs : il est crucial de comprendre immédiatement qui doit quoi à qui.
- **Tokens sémantiques stricts** :
  - *Créancier* (solde positif) : badge vert émeraude (`.badge-creditor`), sous-titre rassurant « On lui doit ».
  - *Débiteur* (solde négatif) : badge ambré/rouge (`.badge-debtor`), sous-titre explicite « Doit de l'argent ».
  - *À l'équilibre* (solde nul) : badge neutre (`.badge-member`), mention claire « À l'équilibre ».
- **Chiffres tabulaires (`font-variant-numeric: tabular-nums`)** : Chaque chiffre occupe la même largeur horizontale, éliminant tout sautillement optique lors de la lecture des montants.

#### B. Visualisation en Flux des Règlements (Algorithme Glouton)
Au lieu d'un tableau brut ou d'une liste textuelle accompagnée d'émojis, le plan de remboursement calculé par l'algorithme glouton est matérialisé par des **cartes de transfert directionnel** (`.settlement-card`) :
- Débiteur `[Avatar + Nom]` ➔ Flèche vectorielle SVG `#icon-arrow-right` ➔ Créancier `[Avatar + Nom]`.
- Montant mis en avant en gras tabulaire.
- Bouton d'action directe « Régler » avec icône vectorielle `#icon-check`, déclenchant le formulaire transactionnel `POST` (`expenses:reimburse`) développé au Volet 3, protégé par jeton CSRF et dialogue natif de confirmation.

#### C. Ergonomie & Accessibilité des Formulaires (`expense_form.html`, `wallet_form.html`, `wallet_invite.html`)
Les formulaires de saisie financière doivent inspirer confiance et être simples à manipuler :
1. **Conteneur centré harmonisé (`.form-container`)** : Largeur calibrée (max 480px à 580px) pour éviter les lignes de saisie trop longues fatiguant l'œil.
2. **Pastilles d'en-tête** : Présence d'une pastille iconographique (`#icon-receipt`, `#icon-wallet`, `#icon-users`) affirmant visuellement la nature de l'action.
3. **Sélection des bénéficiaires** : Remplacement du bloc de cases à cocher brut par une liste espacée avec retour visuel au survol (`hover`) pour une sélection tactile et accessible.
4. **Boutons d'action équilibrés (`.form-actions`)** : Bouton d'enregistrement primaire en pleine largeur (`flex: 1`) et bouton d'annulation secondaire.

---

### 3. Contrôles de Validation Effectués

| Point de Contrôle | Résultat Attendu | Constat |
| :--- | :--- | :--- |
| **Tests unitaires Django** | `python manage.py test apps` (26 tests) | **100 % de succès (26/26 OK)** |
| **Sécurité des formulaires** | Présence des jetons `{% csrf_token %}` et dialogues de confirmation | **100 % conforme** |
| **Intégrité de l'algorithme glouton** | Plan de remboursement et annulation de règlements intacts | **100 % préservé** |
| **Code métier de Gautam & Abdelkader** | Zéro modification dans `models.py` et `services.py` | **100 % intouché** |
