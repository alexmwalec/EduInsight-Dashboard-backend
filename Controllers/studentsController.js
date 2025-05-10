const studentModel = require("../models/studentModel");

// Controller to fetch all students
const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.getStudents();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Controller to add a new student
const addStudent = async (req, res) => {
  const { name, sex, class_assigned, parent, contact } = req.body;
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

module.exports = {
  getAllStudents,
  addStudent,
};
