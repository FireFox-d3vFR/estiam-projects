# Atelier Angular — liaisons de données et composants

Ce TP utilise un écran de cours pour illustrer comment Angular relie un champ à une propriété, transmet une valeur à un composant enfant et navigue entre deux pages.

## Lancer le projet

Un moteur Docker en marche, Docker Compose et le port local 4200 libre suffisent. Depuis `angular/tp-angular/`, lancer la commande suivante.

```sh
docker compose up --build
```

Ouvrir [l’application sur localhost:4200](http://localhost:4200/). Compose publie le port 4000 du serveur Express sur le port local 4200, ce qui permet de lancer aussi `gestion-cours` sur ses ports hôte 3000 et 4000.

Pour arrêter le projet, exécuter cette commande depuis le même dossier, dans un autre terminal ou après `Ctrl+C`.

```sh
docker compose down
```

## Parcours à essayer

1. Ouvrir l’accueil. Il mène à `/courses`, intitulé **Angular Avancé**. Les trois entrées « Cours 1 », « Cours 2 » et « Cours 3 » apparaissent dans trois listes successives. La première affiche le texte directement, les deux suivantes utilisent le composant enfant `CourseItemComponent`.
2. Saisir une description. Le texte s’affiche immédiatement sous le champ. Le champ se vide quand on recharge la page ou quand on revient depuis **À propos**.
3. Cliquer sur **Commencer le cours** avec la console du navigateur ouverte. L’action se limite au message « Cours commencé ! » dans la console. Le bouton **Commencer** est désactivé. Les entrées des listes sont du texte. Le composant enfant déclare un événement de sélection que son gabarit ne déclenche jamais.
4. Ouvrir directement `/about` ou suivre **À propos**. Cette page affiche « about works! » et la même navigation.

## Données et rendu

Les trois libellés proviennent d’un tableau TypeScript dans `src/app/course.service.ts`. La description reste en mémoire dans le composant. Le projet fonctionne avec un seul conteneur, sans API ni base de données.

L’image installe les versions du lockfile avec `npm ci` sous Node 22, puis lance `npm run build`. Angular prérend les routes à la compilation (`RenderMode.Prerender`). En accès direct, Express sert le HTML déjà généré. Angular le rend ensuite interactif dans le navigateur. Les accès directs à `/courses` et `/about` ont été vérifiés sur le conteneur.

## Tests existants

`npm test -- --watch=false --browsers=ChromeHeadless` exécute sept tests avec Chrome ou Chromium disponible. Cinq réussissent. Le test de titre attend encore « Hello, tp-angular » dans le composant racine. Le test de création de `CoursesComponent` ne charge pas `FormsModule`, requis par `ngModel`. L’application charge ce module pour le champ de description.
