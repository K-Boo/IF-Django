"""
Script d'initialisation de la base éphémère E2E pour Les Bons Comptes.
Crée les utilisateurs de test sans impacter la base de développement.
"""
import os
import sys
import django

# Configuration de l'environnement Django
current_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.abspath(os.path.join(current_dir, "..", "..", "if-django-2026", "src"))
sys.path.insert(0, project_dir)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def seed_users():
    test_users = [
        {"username": "khalil", "email": "khalil@etu.univ-lille.fr", "password": "Password123!"},
        {"username": "abdelkader", "email": "abdelkader@etu.univ-lille.fr", "password": "Password123!"},
        {"username": "gautam", "email": "gautam@etu.univ-lille.fr", "password": "Password123!"},
    ]

    print("--- Initialisation des utilisateurs E2E ---")
    for u_data in test_users:
        user, created = User.objects.get_or_create(
            username=u_data["username"],
            defaults={"email": u_data["email"]},
        )
        user.set_password(u_data["password"])
        user.save()
        status = "créé" if created else "mis à jour"
        print(f"Utilisateur {user.username} ({user.email}) {status}.")

    print("Initialisation terminée avec succès.")

if __name__ == "__main__":
    seed_users()
