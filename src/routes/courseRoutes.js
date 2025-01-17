// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Cela permet de gérer les points d'entrée de manière organisée et facilite la navigation dans le code.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Grouper les routes par fonctionnalité ou ressource, et respecter une hiérarchie logique.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/addCourse', courseController.createCourse);    
router.get('/:id', courseController.getCourse);
router.get('/', courseController.listCourses);

module.exports = router;
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