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
async function getCourseStats(req, res) {
  try {
    const cachedStats = await redisService.getData("courseStats");
    if (cachedStats) {
      return res.status(200).json(cachedStats);
    }

    const stats = await db
      .getDb()
      .collection("courses")
      .aggregate([
        {
          $group: {
            _id: null,
            totalCourses: { $sum: 1 },
            averageDuration: { $avg: "$duration" },
            maxDuration: { $max: "$duration" },
            minDuration: { $min: "$duration" },
          },
        },
      ])
      .toArray();

    if (stats.length === 0) {
      return res.status(404).json({ error: "No course statistics found" });
    }

    await redisService.cacheData("courseStats", stats[0], 3600); // Cache for 1 hour

    res.status(200).json(stats[0]);
  } catch (error) {
    console.error("Error getting course stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const updateData = req.body;
    const result = await db
      .getDb()
      .collection("courses")
      .updateOne({ _id: new ObjectId(courseId) }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const result = await db
      .getDb()
      .collection("courses")
      .deleteOne({ _id: new ObjectId(courseId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  createCourse,
  getCourse,
  listCourses,
  getCourseStats,
  updateCourse,
  deleteCourse,
};
