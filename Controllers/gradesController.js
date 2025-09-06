const gradesModel = require("../Models/gradesModel");

const addGrade = async (req, res) => {
  const { student_name, score, subject, class_assigned, week } = req.body;

  if (!student_name || !score || !subject || !class_assigned) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newGrade = await gradesModel.addGrade({
      student_name,
      score: parseFloat(score),
      subject,
      class_assigned,
      week: week || 1,
    });
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getGradesByClass = async (req, res) => {
  const { class_assigned } = req.query;
  if (!class_assigned) return res.status(400).json({ error: "class_assigned is required" });

  try {
    const grades = await gradesModel.getGradesByClass(class_assigned);
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch grades" });
  }
};

module.exports = { addGrade, getGradesByClass };
