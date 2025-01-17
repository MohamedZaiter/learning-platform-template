const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createStudent(req, res) {
  try {
    const studentData = req.body; 
    const result = await mongoService.createCourse('students', studentData); 
    res.status(201).json({
      message: 'Student created successfully',
      studentId: result.insertedId, 
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create student',
      details: error.message,
    });
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    const student = await mongoService.findOneById('students', studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student', details: error.message });
  }
}

async function listStudents(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const students = await mongoService.listCourses('students', page, limit);
    res.status(200).json(students);
  } catch (error) {
    console.error('Error listing students:', error);
    res.status(500).json({ error: 'Failed to list students', details: error.message });
  }
  
}
async function updateStudent(req, res) {
    try {
      const studentId = req.params.id;
      if (!ObjectId.isValid(studentId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      const updateData = req.body;
      const result = await db
        .getDb()
        .collection("students")
        .updateOne({ _id: new ObjectId(studentId) }, { $set: updateData });
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      // Invalidate cache
      await redisService.deleteData(`student:${studentId}`);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  async function deleteStudent(req, res) {
    try {
      const studentId = req.params.id;
      if (!ObjectId.isValid(studentId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      const result = await db
        .getDb()
        .collection("students")
        .deleteOne({ _id: new ObjectId(studentId) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      // Invalidate cache
      await redisService.deleteData(`student:${studentId}`);
  
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

module.exports = {
  createStudent,
  getStudent,
  listStudents,
  updateStudent,
  deleteStudent,


};