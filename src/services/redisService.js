// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En configurant des TTL (Time-to-Live) pour limiter la durée de vie des données en cache et en invalidant le cache lorsque les données sont mises à jour.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser une convention de nommage claire et unique pour éviter les collisions, comme "namespace:resource:id".

const db = require('../config/db');

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  const redisClient = db.getRedisClient();
  await redisClient.set(key, JSON.stringify(data), {
    EX: ttl, // TTL en secondes
  });
}

async function getCachedData(key) {
  const redisClient = db.getRedisClient();
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

module.exports = {
  cacheData,
  getCachedData,
};