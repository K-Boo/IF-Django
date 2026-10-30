# RÈGLE 06 : STANDARDS FRONT-END, DESIGN TOKENS & ANTI-SLOP (« THE DJANGO WAY »)

## 1. Interdictions Stylistiques Formelles (Prévention « AI Slop »)
- **Typographie** : Interdiction absolue d'utiliser la pile de polices système générique sans hiérarchie. Imposer un diptyque typographique expressif (*Plus Jakarta Sans* / *Satoshi*) et activer systématiquement les **chiffres tabulaires** (`font-variant-numeric: tabular-nums`) pour tout montant ou devise.
- **Palette chromatique** : Proscription totale des dégradés violet/indigo sur fond sombre et du noir pur (`#000000`). Utiliser exclusivement la palette sémantique en espace **OKLCH** définie dans `tokens.css` avec l'accent signature **Émeraude Trésorerie** (`oklch(0.62 0.18 150)`) et le fond ardoise/zinc profond (`oklch(0.18 0.02 260)`).
- **Structure spatiale** : Bannir l'accumulation de cartes symétriques flottantes (`rounded-2xl`). Utiliser une échelle modulaire de courbures (inputs `rounded-md`, boutons `rounded-lg`, conteneurs `rounded-xl`) et structurer les pages par des bordures nettes (`border-t`, `divide-y`).
- **Comportement viewport** : Interdiction formelle d'utiliser `h-screen` sur les conteneurs principaux en raison des sauts de mise en page sur mobile. Employer exclusivement `min-h-[100svh]`.
- **Cinétique** : Proscription des zooms agressifs (`hover:scale-105`). Privilégier des transitions de 150-200ms sur la couleur de bordure ou une élévation subtile (`translateY(-1px)`), encadrées par `@media (prefers-reduced-motion: no-preference)`.

## 2. Principes Architecturaux SOLID & Django MVT
- **SRP (Single Responsibility)** :
  - Découpage strict du CSS dans `src/static/css/` (`tokens.css`, `base.css`, `components/*.css`, `layouts/*.css`).
  - Découpage des gabarits complexes en composants atomiques réutilisables dans `src/templates/components/` (`avatar.html`, `badge.html`, `empty_state.html`, `debt_card.html`, etc.).
- **OCP (Open / Closed)** :
  - Les composants de base (`.btn`, `.badge`, `.card`) sont fermés aux modifications destructrices et ouverts à l'extension via des modificateurs sémantiques (`.btn--primary`, `.btn--outline`, `.badge--creditor`).
- **LSP (Liskov Substitution)** :
  - Les éléments interactifs partagent la même convention de style qu'ils soient rendus via `<a>` ou `<button>`, avec gestion accessible du focus (`:focus-visible`) et dimensionnement tactile minimum de 44x44px.
- **ISP (Interface Segregation)** :
  - Les partials templates ne doivent recevoir que le strict minimum de variables contextuelles (ex. `username` pour un avatar, sans forcer le passage d'une instance lourde de modèle ORM).
- **DIP (Dependency Inversion)** :
  - Aucun gabarit ni composant ne dépend de valeurs hexadécimales en dur. Tous dépendent d'abstractions : les tokens sémantiques CSS (`var(--color-surface)`, `var(--color-primary)`).

## 3. Prise en Compte Obligatoire des États Limites
- Tout écran comportant une liste de données (cagnottes, dépenses, invitations, membres) doit **obligatoirement** implémenter un état vide directionnel (*Empty State*) stimulant, invitant explicitement l'utilisateur à accomplir sa première action via un bouton CTA.
- Les messages d'erreurs et de validation doivent être explicites, formulés en langage naturel orienté utilisateur et placés à proximité directe du champ ou de l'action concernée.

## 4. Boucle de Rétroaction Visuelle & Multi-Résolutions
- Tout développement ou refonte de page doit être vérifié sur 3 points de rupture :
  - **Mobile (390px)** : absence de débordement horizontal, cibles tactiles confortables.
  - **Tablette (768px)** : répartition aérée des grilles à deux colonnes.
  - **Desktop (1440px)** : conteneur centré (`max-width: 1200px`) pour préserver la longueur de ligne optimale de lecture.
- La conformité au contraste **WCAG AA** est obligatoire pour tous les éléments textuels et badges.
