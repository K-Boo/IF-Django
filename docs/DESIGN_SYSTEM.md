# Contrat de Design & Design System : « Les Bons Comptes »

Ce document constitue le contrat visuel et technique immuable régissant l'identité graphique, les tokens sémantiques et les composants de l'application **« Les Bons Comptes »** (Projet M2 MIAGE IF-Django).

---

## 1. Direction Artistique & Valeurs

- **Concept** : « L'Élégance Collective & Transparence Financière ».
- **Positionnement** : À la croisée d'un outil de fintech moderne (*Revolut, Wise*) et d'un outil de productivité d'équipe sobre et véloce (*Linear, Splitwise 2.0*).
- **Règles Négatives Anti-Slop** :
  - ❌ Zéro dégradé violet/indigo ou effet néon.
  - ❌ Zéro noir pur (`#000000`) : toujours des teintes ardoise/zinc profondes.
  - ❌ Zéro police indifférenciée `Inter` seule : diptyque *Plus Jakarta Sans* pour les titres + chiffres tabulaires obligatoires.
  - ❌ Zéro empilement infini de cartes `rounded-2xl` flottantes.
  - ❌ Zéro saut de viewport mobile (`h-screen` banni au profit de `min-h-[100svh]`).

---

## 2. Tokens de Design (Espace Colorimétrique OKLCH)

```css
:root {
    /* === PALETTE SÉMANTIQUE DE FOND & SURFACES === */
    --color-bg-canvas: oklch(0.985 0.005 240);       /* Albâtre clair très doux */
    --color-surface-base: oklch(1.000 0.000 0);       /* Blanc carte pure */
    --color-surface-raised: oklch(0.965 0.008 240);    /* Surface contrastée / hover */
    --color-surface-sunken: oklch(0.940 0.010 240);    /* Fond d'inputs et badges */
    
    /* === SURFACES PROFONDES (ACCENTS SOMBRES) === */
    --color-slate-dark: oklch(0.180 0.020 260);        /* Ardoise sombre / Zinc-950 */
    --color-slate-muted: oklch(0.400 0.025 260);       /* Texte secondaire et icônes */
    
    /* === COULEURS SIGNATURES FINTECH === */
    --color-primary: oklch(0.620 0.180 150);          /* Émeraude Trésorerie */
    --color-primary-hover: oklch(0.550 0.190 150);    /* Émeraude foncée */
    --color-primary-subtle: oklch(0.950 0.040 150);   /* Teinte verte légère fond */
    
    /* === ÉQUILIBRE FINANCIER & DETTES === */
    --color-creditor: oklch(0.650 0.170 145);         /* Solde positif (Vert franc) */
    --color-creditor-bg: oklch(0.960 0.040 145);      /* Fond badge créancier */
    --color-debtor: oklch(0.620 0.190 35);            /* Solde négatif (Corail sépia) */
    --color-debtor-bg: oklch(0.960 0.040 35);         /* Fond badge débiteur */
    
    /* === TYPOGRAPHIE & HIÉRARCHIE === */
    --font-display: 'Plus Jakarta Sans', -apple-system, sans-serif;
    --font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
    
    /* === ÉCHELLE MODULAIRE DE RAYONS (RADII) === */
    --radius-xs: 4px;
    --radius-sm: 6px;   /* Champs de formulaires, tags */
    --radius-md: 8px;   /* Boutons standards */
    --radius-lg: 12px;  /* Cartes moyennes */
    --radius-xl: 16px;  /* Modales, grands conteneurs */
    
    /* === OMBRES FINES ET NATURELLES === */
    --shadow-subtle: 0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06);
    --shadow-card: 0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05);
    --shadow-dropdown: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);
}
```

---

## 3. Système Typographique & Chiffres Financiers

Tous les montants, totaux, soldes et statistiques monétaires doivent obligatoirement utiliser la règle :
```css
.tabular-nums, .amount, .balance-val {
    font-variant-numeric: tabular-nums lining-nums;
    letter-spacing: -0.015em;
    font-weight: 600;
}
```

---

## 4. Catalogue des Composants Atomiques Django

| Composant | Fichier Template | Fichier CSS | Responsabilité unique |
| :--- | :--- | :--- | :--- |
| **Avatar** | `components/avatar.html` | `components/avatars.css` | Affiche l'initiale colorée déterminée par hash du nom d'utilisateur. |
| **Badge Statut** | `components/badge.html` | `components/badges.css` | Rendu des états `Ouvert`, `Clos`, `Créancier`, `Débiteur`, `Admin`. |
| **Empty State** | `components/empty_state.html` | `components/empty-states.css` | Affiche une icône SVG, un titre didactique, une description et un bouton CTA. |
| **Ligne Dépense** | `components/expense_row.html` | `components/expenses.css` | Carte/Ligne horizontale de dépense avec date, payeur, quote-part et montant. |
| **Carte Dette** | `components/debt_card.html` | `components/debts.css` | Schématise « A doit rembourser B de X € » avec bouton de règlement. |
| **Bouton** | Balise HTML `.btn` | `components/buttons.css` | Bouton standardisé (variants : `--primary`, `--outline`, `--danger`, `--ghost`). |
