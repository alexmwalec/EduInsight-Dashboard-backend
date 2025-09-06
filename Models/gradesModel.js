const pool = require("../db"); // your pg pool

const addGrade = async ({ student_name, score, subject, class_assigned, week }) => {
  // Get student's sex
  const studentRes = await pool.query(
    "SELECT sex FROM students WHERE name=$1 AND class_assigned=$2",
    [student_name, class_assigned]
  );

  if (!studentRes.rows.length) {
    throw new Error("Student does not exist in your class");
  }

  const sex = studentRes.rows[0].sex;

  const res = await pool.query(
    "INSERT INTO grades (student_name, score, subject, class_assigned, week, sex) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [student_name, score, subject, class_assigned, week, sex]
  );
  return res.rows[0];
};

const getGradesByClass = async (class_assigned) => {
  const res = await pool.query(
    "SELECT * FROM grades WHERE class_assigned=$1",
    [class_assigned]
  );
  return res.rows;
};

module.exports = { addGrade, getGradesByClass };
