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
