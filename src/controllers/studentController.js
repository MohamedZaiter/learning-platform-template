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

module.exports = {
  createStudent,
  getStudent,
  listStudents,
};