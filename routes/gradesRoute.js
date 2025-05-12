const express = require("express");
const router = express.Router();
const { saveGrade, getGradesByClass } = require("../Controllers/gradesController");

router.post("/", saveGrade);
router.get("/", getGradesByClass);

module.exports = router;
