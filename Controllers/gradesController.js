const pool = require('../db');

// Save grade
const saveGrade = async (req, res) => {
  const { student_name, subject, score, class_assigned } = req.body;

  if (!student_name || !subject || !score || !class_assigned) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO grades (student_name, subject, score, class_assigned)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [student_name, subject, score, class_assigned]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error saving grade:", err);
    res.status(500).json({ error: "Failed to save grade" });
  }
};

// Get grades by class
const getGradesByClass = async (req, res) => {
  const { class_assigned } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM grades WHERE class_assigned = $1',
      [class_assigned]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching grades:", err);
    res.status(500).json({ error: "Failed to fetch grades" });
  }
};

module.exports = { saveGrade, getGradesByClass };
