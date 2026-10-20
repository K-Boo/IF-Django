# Guide de Démarrage Rapide : Bienvenue à l'Atelier Django ! 🚀

> **Temps d'installation estimé : < 5 minutes.**  
> Ce guide s'adresse à tous les étudiants de la promotion, y compris si vous n'avez jamais utilisé Django ni Python auparavant.

---

## Étape 1 : Cloner le Répertoire

Ouvrez un terminal et clonez le dépôt officiel du groupe :
```bash
git clone https://gitlab.univ-lille.fr/khalil.bouchama.etu/if-django.git
cd if-django
```

---

## Étape 2 : Lancer l'Environnement (Au Choix)

### Option A : Avec Docker (Recommandé - Zéro Installation Locale)
Si vous avez Docker Desktop installé sur votre machine :
```bash
# 1. Copier le fichier d'environnement
cp .env.example .env

# 2. Démarrer la base de données PostgreSQL partagée
docker compose up -d db

# 3. Vérifier que la base est opérationnelle
docker compose ps
```

### Option B : Avec Python Local (Python 3.12+)
Si vous préférez exécuter en local :
```bash
# 1. Créer et activer l'environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Windows : .\venv\Scripts\activate

# 2. Installer les dépendances minimales
pip install -r requirements.txt

# 3. Copier le fichier d'environnement
cp .env.example .env
```

---

## Étape 3 : Vérifier que Tout Fonctionne

Pour tester que votre environnement est prêt pour le TP :
```bash
# Exécuter le test de santé de l'atelier
python -m pytest tp/tests/test_env.py
```
Si le test affiche `PASSED`, félicitations ! Vous êtes prêts à ouvrir [`tp/SUJET_TP.md`](./SUJET_TP.md) et démarrer l'exercice 1.
