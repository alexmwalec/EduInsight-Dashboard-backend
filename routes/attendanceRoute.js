const express = require('express');
const router = express.Router();
const { getStudentsByClass, recordAttendance } = require('../Controllers/attendanceController');

router.get('/students', getStudentsByClass);
router.post('/', recordAttendance);

module.exports = router;
