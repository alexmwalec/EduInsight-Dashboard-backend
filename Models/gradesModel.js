const pool = require("../db"); // adjust path to your db connection

// Add grade (with class validation)
const addGrade = async (student_name, subject, score, class_assigned) => {
  // Check if student exists in that class
  const studentCheck = await pool.query(
    "SELECT * FROM students WHERE name = $1 AND class_assigned = $2",
    [student_name, class_assigned]
  );

  if (studentCheck.rows.length === 0) {
    throw new Error("Student does not exist in this class");
  }

  const result = await pool.query(
    `INSERT INTO grades (student_name, subject, score, class_assigned)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [student_name, subject, score, class_assigned]
  );
  return result.rows[0];
};

// Get all grades by class
const getGradesByClass = async (class_assigned) => {
  const result = await pool.query(
    "SELECT * FROM grades WHERE class_assigned = $1",
    [class_assigned]
  );
  return result.rows;
};

// Delete grade by composite key
const deleteGrade = async (student_name, subject, class_assigned) => {
  const result = await pool.query(
    "DELETE FROM grades WHERE student_name = $1 AND subject = $2 AND class_assigned = $3 RETURNING *",
    [student_name, subject, class_assigned]
  );
  return result.rows[0];
};

module.exports = {
  addGrade,
  getGradesByClass,
  deleteGrade,
};
