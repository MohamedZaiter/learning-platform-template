# Projet de fin de module NoSQL

## Description du Projet

Ce projet consiste à développer une API backend pour une plateforme d'apprentissage en ligne. L'API permettra de gérer les cours, les étudiants et les inscriptions. Elle utilisera MongoDB pour stocker les données des cours et des étudiants, et Redis pour la gestion du cache.

### Fonctionnalités Principales

- Gestion des cours (création, mise à jour, suppression, récupération)
- Gestion des étudiants (création, mise à jour, suppression, récupération)
- Utilisation de Redis pour le caching des données fréquemment accédées

## Organisation Pratique

1. Création de votre dépôt :
   - Sur Github.com
   - Créez un nouveau dépôt public
   - Nommez-le "learning-platform-nosql"
   - Ne l'initialisez pas avec un README pour le moment

2. Configuration de votre environnement local :
   bash
   # Clonez mon dépôt template (ce dépôt)
   git clone https://github.com/pr-daaif/learning-platform-template
   
   # Renommez le dépôt origin
   cd learning-platform-template
   git remote remove origin
   
   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/[votre-compte]/learning-platform-nosql
   
   # Poussez le code vers votre dépôt
   git push -u origin main
   

3. Installation des dépendances :
   bash
   npm install
   

Je vous propose une structure de code qui suit les bonnes pratiques de développement. Vous trouverez dans le code des commentaires avec des *questions qui vous guideront dans votre réflexion*. Ces questions sont importantes car elles vous aideront à comprendre les choix d'architecture.

### Aspects professionnels à noter :
- Utilisation des variables d'environnement pour la configuration
- Séparation claire des responsabilités (routes, contrôleurs, services)
- Gestion propre des connexions aux bases de données
- Organisation modulaire du code
- Gestion des erreurs et des cas limites
- Documentation du code

### Pour le rendu, voici ce que j'attends :
1. Un dépôt public sur Github avec un historique de commits clair
2. Un README.md qui explique :
   - Comment installer et lancer le projet
   - La structure du projet
   - Les choix techniques que vous avez faits
   - Les réponses aux questions posées dans les commentaires
3. Le code complété avec tous les TODOs implémentés

### Je vous conseille de procéder étape par étape :
1. Commencez par lire et comprendre la structure du projet
2. Répondez aux questions des commentaires dans le README
3. Implémentez progressivement les TODOs
4. Testez chaque fonctionnalité au fur et à mesure
5. Documentez vos choix et vos réflexions en ajoutant des copies d'écrans à votre fichier README.md

#### Bon courage

## Installation et Lancement du Projet

### Prérequis
- Node.js (version 14 ou supérieure)
- MongoDB
- Redis

### Installation
1. Clonez le dépôt :
   bash
   git clone https://github.com/[votre-compte]/learning-platform-nosql
   cd learning-platform-nosql
   

2. Installez les dépendances :
   bash
   npm install
   

3. Configurez les variables d'environnement en créant un fichier .env à la racine du projet et en y ajoutant les variables suivantes :
   env
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DB_NAME=learning_platform
   REDIS_URI=redis://localhost:6379
   PORT=3000
   

### Lancement
Pour démarrer le serveur, exécutez la commande suivante :
bash
npm start


Le serveur sera accessible à l'adresse http://localhost:3000.

## Structure du Projet

- src/
  - app.js : Point d'entrée de l'application
  - config/ : Configuration de l'application (base de données, environnement)
    - db.js : Connexion aux bases de données MongoDB et Redis
    - env.js : Validation et chargement des variables d'environnement
  - controllers/ : Logique métier de l'application
    - courseController.js : Contrôleur pour les cours
    - studentController.js : Contrôleur pour les étudiants
  - routes/ : Définition des routes de l'API
    - courseRoutes.js : Routes pour les cours
    - studentRoutes.js : Routes pour les étudiants
  - services/ : Services pour l'interaction avec les bases de données
    - mongoService.js : Service pour MongoDB
    - redisService.js : Service pour Redis

## Choix Techniques

### Utilisation des Variables d'Environnement
Les variables d'environnement permettent de configurer l'application sans modifier le code source. Elles sont chargées et validées au démarrage de l'application pour garantir que toutes les informations nécessaires sont disponibles.

### Séparation des Responsabilités
Le code est organisé de manière modulaire avec une séparation claire des responsabilités :
- Les contrôleurs gèrent la logique métier.
- Les routes définissent les points d'entrée de l'API.
- Les services centralisent les interactions avec les bases de données.

### Gestion des Connexions aux Bases de Données
Les connexions à MongoDB et Redis sont gérées dans des modules séparés pour centraliser la logique de connexion et faciliter la réutilisation du code.

### Gestion des Erreurs
Les erreurs sont gérées de manière centralisée dans les contrôleurs pour fournir des réponses claires et cohérentes aux clients de l'API.

## Réponses aux Questions des Commentaires

### .env
- *Quelles sont les informations sensibles à ne jamais commiter ?*
  - Les informations sensibles telles que les URI de base de données, les clés API, et les mots de passe ne doivent jamais être commitées dans le dépôt.
- *Pourquoi utiliser des variables d'environnement ?*
  - Les variables d'environnement permettent de configurer l'application de manière flexible et sécurisée sans modifier le code source.

### src/config/env.js
- *Pourquoi est-il important de valider les variables d'environnement au démarrage ?*
  - Cela garantit que l'application dispose de toutes les informations nécessaires avant de démarrer, évitant ainsi des erreurs imprévisibles.
- *Que se passe-t-il si une variable requise est manquante ?*
  - L'application doit arrêter son démarrage et signaler clairement quelle variable manque.

### src/controllers/courseController.js
- *Quelle est la différence entre un contrôleur et une route ?*
  - Un contrôleur gère la logique métier, tandis qu'une route définit les points d'entrée de l'API.
- *Pourquoi séparer la logique métier des routes ?*
  - Cela permet de rendre le code plus organisé, réutilisable et testé de manière isolée.

### src/routes/courseRoutes.js
- *Pourquoi séparer les routes dans différents fichiers ?*
  - Cela permet de gérer les points d'entrée de manière organisée et facilite la navigation dans le code.
- *Comment organiser les routes de manière cohérente ?*
  - Grouper les routes par fonctionnalité ou ressource, et respecter une hiérarchie logique.

### src/config/db.js
- *Pourquoi créer un module séparé pour les connexions aux bases de données ?*
  - Cela permet de centraliser et réutiliser la logique de connexion, ce qui rend le code plus modulaire et maintenable.
- *Comment gérer proprement la fermeture des connexions ?*
  - Utiliser des hooks ou des événements pour détecter la fermeture de l'application et fermer les connexions avec close().

### src/services/mongoService.js
- *Pourquoi créer des services séparés ?*
  - Cela permet de centraliser les interactions avec la base de données, de rendre le code plus modulaire et de faciliter les tests unitaires.

### src/services/redisService.js
- *Comment gérer efficacement le cache avec Redis ?*
  - En configurant des TTL (Time-to-Live) pour limiter la durée de vie des données en cache et en invalidant le cache lorsque les données sont mises à jour.
- *Quelles sont les bonnes pratiques pour les clés Redis ?*
  - Utiliser une convention de nommage claire et unique pour éviter les collisions, comme "namespace:resource:id".