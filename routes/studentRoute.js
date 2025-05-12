const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/studentsController");

router.get("/", studentController.getAllStudents); // This now handles class filtering
router.post("/", studentController.addStudent);
router.get("/stats", studentController.getStudentStats);

module.exports = router;
