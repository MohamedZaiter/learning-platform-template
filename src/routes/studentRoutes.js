const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudent);
router.get('/', studentController.listStudents);

module.exports = router;