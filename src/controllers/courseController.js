// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur gère la logique métier, tandis qu'une route définit les points d'entrée de l'API.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Cela permet de rendre le code plus organisé, réutilisable et testé de manière isolée.

const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const courseData = req.body; 
    const result = await mongoService.createCourse('courses', courseData); 
    res.status(201).json({
      message: 'Course created successfully',
      courseId: result.insertedId, 
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create course',
      details: error.message,
    });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const course = await mongoService.getCourse(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course', details: error.message });
  }
}

async function listCourses(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const courses = await mongoService.listCourses(page, limit);
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error listing courses:', error);
    res.status(500).json({ error: 'Failed to list courses', details: error.message });
  }
}

module.exports = {
  createCourse,
  getCourse,
  listCourses,
};