# Quiz Interactif : Testez vos Réflexes Django ! (Kahoot / QCM)

> **Animation de fin de présentation (10 minutes)**  
> 5 questions à choix multiples pour dynamiser la classe avant le lancement de l'atelier pratique.

---

### Question 1 : Que signifie l'architecture MVT de Django ?
- A) Model - View - Template *(Bonne réponse)*
- B) Main - Variable - Thread
- C) Module - View - Transaction
- D) Microservice - Virtual - Type
> **Explication** : Django utilise le terme *Template* pour la couche de présentation HTML et *View* pour la logique de traitement (qui correspondrait au Controller dans un modèle MVC classique).

---

### Question 2 : Que se passe-t-il si j'accède à une ForeignKey dans une boucle sans `select_related` ?
- A) Django lève une exception `LazyLoadingError`
- B) Django émet une requête SQL supplémentaire par itération (problème N+1) *(Bonne réponse)*
- C) Django met en cache automatiquement toutes les relations sans coût
- D) La base de données refuse la connexion
> **Explication** : C'est le piège classique de l'ORM : l'évaluation paresseuse (*lazy*) déclenche une requête SQL `SELECT` distincte à chaque tour de boucle si aucune jointure n'a été spécifiée en amont.

---

### Question 3 : Quelle méthode de l'ORM permet d'effectuer une jointure SQL `INNER JOIN` sur une clé étrangère ?
- A) `prefetch_related()`
- B) `select_related()` *(Bonne réponse)*
- C) `join()`
- D) `aggregate()`
> **Explication** : `select_related` réalise une vraie jointure SQL (`JOIN`) au niveau de la requête unique, idéale pour les relations 1-1 et N-1. `prefetch_related` exécute une seconde requête par lot `WHERE id IN (...)` pour les relations ManyToMany.

---

### Question 4 : Comment Django protège-t-il nativement les formulaires contre les attaques CSRF ?
- A) En bloquant toutes les requêtes POST
- B) En injectant un token cryptographique unique via le tag `{% csrf_token %}` *(Bonne réponse)*
- C) En utilisant un middleware payant
- D) En forçant l'utilisation de HTTPS uniquement
> **Explication** : Le middleware CSRF de Django vérifie qu'un jeton aléatoire signé côté serveur est présent dans chaque soumission de formulaire POST, neutralisant les attaques par falsification de requête intersite.

---

### Question 5 : À quoi sert l'instruction `select_for_update()` dans une transaction Django ?
- A) À mettre à jour un enregistrement sans passer par `save()`
- B) À poser un verrou exclusif sur la ligne SQL en base de données pour éviter les courses critiques *(Bonne réponse)*
- C) À afficher un formulaire de mise à jour dans l'Admin
- D) À accélérer les requêtes de lecture
> **Explication** : `select_for_update()` traduit la requête en SQL `SELECT ... FOR UPDATE`, empêchant toute autre transaction concurrente de modifier ou lire cette ligne avant le commit de la transaction en cours.
