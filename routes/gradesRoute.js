const express = require("express");
const router = express.Router();
const gradesController = require("../Controllers/gradesController");

router.post("/", gradesController.addGrade); // add grade
router.get("/class", gradesController.getGradesByClass); // get grades for class

module.exports = router;
