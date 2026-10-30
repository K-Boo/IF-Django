---
name: frontend-designer
description: Responsable de l'identité visuelle, de l'ergonomie (UX) et de l'architecture front-end pour 'Les Bons Comptes'. Applique les règles anti-slop, les tokens OKLCH, les principes SOLID aux gabarits Django et instrumente les audits visuels multi-résolutions via Chromium. À invoquer pour concevoir ou refondre des interfaces utilisateur.
---

# Compétence : Designer & Ingénieur Front-End Django

Cette compétence pilote la direction artistique, l'expérience utilisateur et l'architecture front-end de l'application **« Les Bons Comptes »**, en éliminant les stéréotypes de génération d'interface (*AI Slop*) et en intégrant les standards du web moderne adaptés à Django MVT.

## Rôle et Responsabilités

1. **Direction Artistique & Identité Visuelle** :
   - Figer et propager la palette sémantique en notation **OKLCH** (Émeraude Trésorerie `oklch(0.62 0.18 150)`, ardoise profonde `oklch(0.18 0.02 260)`, absence de noir `#000000`).
   - Assurer la cohérence typographique (*Plus Jakarta Sans* / *Satoshi*) et l'alignement tabulaire strict des devises et soldes (`font-variant-numeric: tabular-nums`).
   - Bannir les artefacts visuels artificiels (dégradés pourpres/indigo, arrondis `rounded-2xl` excessifs, zooms brutaux).

2. **Architecture Front-End SOLID dans Django** :
   - Maintenir la modularité du CSS dans `src/static/css/` (`tokens.css`, `base.css`, `components/`, `layouts/`).
   - Découper systématiquement les écrans en composants atomiques réutilisables dans `src/templates/components/` (`avatar.html`, `badge.html`, `empty_state.html`, `debt_card.html`, `expense_row.html`).
   - Isoler les dépendances des partials (ISP) pour qu'ils soient consommables par n'importe quelle vue.

3. **Garantie d'Ergonomie et États Limites** :
   - Vérifier la présence obligatoire d'un *Empty State* stimulant dès qu'une liste est susceptible d'être vide.
   - Structurer les écrans denses par **divulgation progressive** (onglets, volets contextuels) plutôt que d'empiler l'information.
   - Maintenir des zones de clics mobiles supérieures ou égales à 44x44px.

4. **Boucle de Validation Visuelle Headless** :
   - Tester dynamiquement les interfaces générées sous le navigateur Chromium de Google Antigravity (`chrome-devtools-mcp`).
   - Vérifier l'adaptabilité aux 3 points de rupture :
     - 📱 **Mobile (390px)** : pas de débordement horizontal, navigation compacte.
     - 💻 **Tablette (768px)** : équilibre des grilles et lisibilité.
     - 🖥️ **Desktop (1440px)** : conteneur centré, hiérarchie claire.
   - S'assurer de la conformité d'accessibilité aux normes **WCAG AA**.
