# PWIZ, help me!

Après avoir appris que le service [https://getpocket.com/]("Pocket") allait disparaître, j'ai souhaité développer une petite application me permettant de retouver - au moins en partie - les fonctionnalités que j'utilisais le plus.

 Lorsque cette application sera terminée (niveau d'achèvement actuel: env. 60%), elle permettra de stocker et retrouver facilement des notes ou des tutoriels, et de les mettre en forme rapidemment.

## Technologies utilisées: Rust + Tauri + Vue + TypeScript

### BACKEND:

Etant curieux de nature, j'ai utilisé:
- [***Rust***](https://www.rust-lang.org/fr) en tant que langage de développement backend,
- [***Tauri***](https://tauri.app/) comme chef d'orchestre entre backend et frontend,
- [***Polodb***](https://www.polodb.org/) pour la base de données. Polodb est un système de base données embarquée (à la manière de Sqlite), codé en Rust, léger et rapide, et dont l'API se rapproche du NoSQL.

### FRONTEND

Pour celles et ceux qui ne connaitraient pas Tauri, c'est un framework qui permet de développer des applications *desktop*, *android* ou encore *IOS* en exploitant la webvue de l'appareil cible. Celà permet de coder la partie frontend dans les langages habituels du web mais, contrairement à ce que peut faire Electron, l'application ne nécessite pas d'embarquer un navigateur complet. L'application finale est donc plus légère. Bien que d'autres frameworks JS soient diponibles, j'ai opté:
- [***Vue.js***](https://vuejs.org/) en tant que framework de développement frontend,
- [***TypeScript***](https://www.typescriptlang.org/) pour l'ajout de contraintes de type, rendant le code javascript final plus sûr tout en apportant des complétions utiles dans votre IDE.

## Démarrer

La présente documentation sera complétée ultérieurement. Patience!

## Quelques idées pour la suite

Manquant cruellement de temps, je ne souhaite pas m'engager à apporter toutes les fonctionnalités que j'aimerais intégrer à cette app. Je vous livre donc ici quelques idées de fonctionnalités qui pourraient apparaître dans un futur plus ou moins proche:

- optimisation de l'API de partage Android, permettant de partager des pages web depuis le navigateur directement avec cette application, comme le proposait l'application Pocket.
- ajout d'un serveur embarqué, afin d'utiliser Pwiz depuis un autre appareil.
- fonctionnalités collaboratives.





