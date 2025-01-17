// Question: Pourquoi créer des services séparés ?
// Réponse: Cela permet de centraliser les interactions avec la base de données, de rendre le code plus modulaire et de faciliter les tests unitaires.

const { ObjectId } = require('mongodb');
const db = require('../config/db');

async function findOneById(collectionName, id) {
  const dbInstance = db.getDb();
  return await dbInstance.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

async function insertOne(collectionName, data) {
  const dbInstance = db.getDb();
  return await dbInstance.collection(collectionName).insertOne(data);
}

async function listCourses(collectionName) {
  const dbInstance = db.getDb();
  return await dbInstance.collection(collectionName).find().toArray();
}

async function createCourse(collectionName, courseData) {
  const dbInstance = db.getDb();
  return await dbInstance.collection(collectionName).insertOne(courseData);
}

module.exports = {
  findOneById,
  insertOne,
  listCourses,
  createCourse, 
};