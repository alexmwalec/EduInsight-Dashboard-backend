const pool = require("../db");

// Get students by class_assigned
const getStudentsByClass = async (class_assigned) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students WHERE class_assigned = $1",
      [class_assigned]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching students by class:", error);
    throw error;
  }
};

// Get student stats (you can customize this function for your specific stats)
const getStudentStats = async (class_assigned) => {
  try {
    const result = await pool.query(
      "SELECT sex, COUNT(*) FROM students WHERE class_assigned = $1 GROUP BY sex",
      [class_assigned]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching student stats:", error);
    throw error;
  }
};

// Add a new student
const addStudent = async (name, sex, class_assigned, parent, contact) => {
  try {
    const result = await pool.query(
      "INSERT INTO students (name, sex, class_assigned, parent, contact) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, sex, class_assigned, parent, contact]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

module.exports = {
  getStudentsByClass,
  getStudentStats,
  addStudent,
};
