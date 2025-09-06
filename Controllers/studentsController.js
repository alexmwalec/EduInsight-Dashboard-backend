const studentModel = require("../Models/studentModel");

// Get student stats (e.g., number of boys, girls, etc.)
const getStudentStats = async (req, res) => {
  try {
    const { class_assigned } = req.query;

    if (!class_assigned) {
      return res.status(400).json({ error: "class_assigned is required" });
    }

    const stats = await studentModel.getStudentStats(class_assigned);
    res.json(stats);
  } catch (err) {
    console.error("Error fetching student stats:", err);
    res.status(500).json({ error: "Failed to fetch student stats" });
  }
};

// Add a new student
const addStudent = async (req, res) => {
  const { name, sex, class_assigned, parent, contact } = req.body;

  if (!name || !sex || !class_assigned || !parent || !contact) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newStudent = await studentModel.addStudent(
      name,
      sex,
      class_assigned,
      parent,
      contact
    );
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Failed to add student" });
  }
};

// Get all students filtered by class_assigned
const getAllStudents = async (req, res) => {
  try {
    const { class_assigned } = req.query;

    if (!class_assigned) {
      return res.status(400).json({ error: "class_assigned is required" });
    }

    const students = await studentModel.getStudentsByClass(class_assigned);

   
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

module.exports = {
  getStudentStats,
  addStudent,
  getAllStudents,
};
