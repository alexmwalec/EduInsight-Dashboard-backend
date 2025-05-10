const express = require('express');
const router = express.Router();
const { recordAttendance, getStudentsByClass } = require('../Controllers/attendanceController');

router.get('/students', getStudentsByClass); // ?class_assigned=2
router.post('/', recordAttendance);

module.exports = router;
