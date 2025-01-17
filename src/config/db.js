// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Cela permet de centraliser et réutiliser la logique de connexion, ce qui rend le code plus modulaire et maintenable.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Utiliser des hooks ou des événements pour détecter la fermeture de l'application et fermer les connexions avec close().

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.redis.uri });
    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    await redisClient.connect();
    console.log('Redis connected');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    throw error;
  }
}

async function closeConnections() {
  if (mongoClient) await mongoClient.close();
  if (redisClient) await redisClient.disconnect();
  console.log('Connections closed');
}

module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  getDb: () => db,
  getRedisClient: () => redisClient,
};