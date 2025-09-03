const express = require("express");
const router = express.Router();
const gradeController = require("../Controllers/gradesController");

// Routes
router.post("/", gradeController.addGrade);
router.get("/class", gradeController.getGradesByClass);
router.delete("/", gradeController.deleteGrade);

module.exports = router;
