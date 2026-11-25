# Catalogue de cours ESTIAM

Ce projet scolaire Angular 19 présente un catalogue de fiches et un tableau d’administration. L’accueil affiche les trois cours publiés les plus récents. La rubrique **Cours** liste toutes les fiches publiées. Un clic sur une carte ouvre la description et la durée du cours.

## Démarrage avec Docker Compose

Prérequis : un moteur Docker en marche, Docker Compose et les ports locaux 3000 et 4000 disponibles. Node et Angular CLI sont fournis par les images.

Depuis `angular/gestion-cours/`, lancer la commande suivante.

```sh
docker compose up --build
```

Ouvrir [l’application sur localhost:4000](http://localhost:4000/). Avec les données initiales, la rubrique **Cours** contient quatre fiches. La cinquième, PowerBi, est dépubliée. Le compte de démonstration `admin` (mot de passe `admin`) permet de voir les cinq fiches dans **Admin**.

Pour arrêter les services, utiliser cette commande depuis le même dossier, dans un second terminal ou après `Ctrl+C`.

```sh
docker compose down
```

JSON Server écrit les cours et les comptes dans le volume nommé `donnees`, initialisé avec une copie de `assets/db.json`. Les modifications survivent à l’arrêt, à la reconstruction des images et à la recréation des conteneurs. Le fichier du dépôt sert de jeu initial. Pour effacer les modifications et repartir de ce jeu au prochain lancement, utiliser `docker compose down -v`. La session de connexion reste dans le stockage local du navigateur.

## Parcours et limites

- **Consultation.** Le parcours accueil → liste → fiche fonctionne dans Chromium. La fiche « Angular Fondamentaux » affiche sa description et une durée de 20 heures.
- **Comptes.** L’inscription, la connexion, la déconnexion et la redirection d’un utilisateur ordinaire qui ouvre `/admin` ont été vérifiées. L’authentification est simulée : le navigateur lit les comptes, compare les mots de passe en clair et mémorise le rôle. L’inscription permet de choisir le rôle admin et l’API accepte directement les écritures.
- **Administration.** Le tableau permet d’ajouter un brouillon, d’éditer une fiche, de changer sa publication et de la supprimer. L’ajout testé a bien été enregistré, mais la lecture immédiate de la nouvelle fiche a renvoyé `404` : le formulaire envoie un identifiant numérique alors que JSON Server cherche une chaîne. Après redémarrage de l’API, la même fiche était accessible et sa modification, sa publication dans le catalogue et sa suppression ont été vérifiées. Le calcul d’identifiant à partir du nombre de cours peut aussi réutiliser un identifiant après une suppression.
- **Autres éléments du code.** La route admin `/add-courses` contient un second formulaire, sans lien dans la navigation. Sa soumission reste à vérifier. Les balises d’image des cartes et des fiches sont commentées.

## Lancement et vérifications techniques

Les images utilisent Node 22 et `npm ci` avec le lockfile du projet. Le service `api` démarre la CLI de JSON Server 1.0.0-beta.3. L’ancien `server.js` à la racine du projet appelle une ancienne API de cette bibliothèque et échoue avec la version verrouillée.

Le service `web` lance le serveur Express compilé depuis `src/server.ts`. L’accueil, le catalogue et les fiches sont rendus à chaque requête pour refléter les publications, y compris les cours créés après le build. Les routes protégées sont rendues dans le navigateur, où leur garde peut lire `localStorage`. Le serveur Angular joint JSON Server à `http://api:3000` sur le réseau Compose. Le navigateur le joint à `http://localhost:3000`.

Le build de production (`npm run build`) aboutit avec un avertissement Angular `NG8107` dans le modèle du tableau admin. Les pages publiques contenaient les données attendues dans le HTML avant exécution de JavaScript. Les lectures de `/courses`, `/courses/1` et `/users` sur le port 3000 ont répondu en HTTP 200.

La commande `npm test -- --watch=false --browsers=ChromeHeadless` reste bloquée à la compilation des tests. Dans `src/app/guards/auth.guard.spec.ts`, l’import de `authGuard` depuis `../auth.guard` ne correspond ni au chemin ni à la classe `AuthGuard` existante. Aucun test unitaire n’a pu s’exécuter.
