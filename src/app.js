// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: En configurant les middlewares, les routes, et les connexions aux bases de données avant de démarrer le serveur.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: En utilisant des blocs try/catch pour gérer les erreurs et s'assurer que les connexions et les services sont correctement initialisés.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes'); // Import des routes des étudiants

const app = express();

app.use(express.json());

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // Monter les middlewares
    app.use(express.urlencoded({ extended: true }));

    // Monter les routes
    app.use('/api/courses', courseRoutes);
    app.use('/api/students', studentRoutes); // Ajout des routes des étudiants

    // Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing connections.');
  await db.closeConnections();
  process.exit(0);
});

startServer();
