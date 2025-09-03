const gradeModel = require("../Models/gradesModel");

// Add grade
const addGrade = async (req , res) =>{

   const {student_name,subject,score,class_assigned} = req.body;
       if (!student_name||subject||score||class_assigned){
        return res.Status(400).json({error: "All field are required"});
       }

  try {
    const newGrade = await gradeModel.addGrade(
      student_name,
      subject,
      score,
      class_assigned
    );
    res.status(201).json(newGrade);
  } catch (err) {
    console.error("Error adding grade:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get all grades by class
const getGradesByClass = async (req, res) => {
  const { class_assigned } = req.query;

  if (!class_assigned) {
    return res.status(400).json({ error: "class_assigned is required" });
  }

  try {
    const grades = await gradeModel.getGradesByClass(class_assigned);
    res.json(grades);
  } catch (err) {
    console.error("Error fetching grades:", err);
    res.status(500).json({ error: "Failed to fetch grades" });
  }
};

// Delete grade
const deleteGrade = async (req, res) => {
  const { student_name, subject, class_assigned } = req.body;

  if (!student_name || !subject || !class_assigned) {
    return res
      .status(400)
      .json({ error: "student_name, subject, and class_assigned are required" });
  }

  try {
    const deletedGrade = await gradeModel.deleteGrade(
      student_name,
      subject,
      class_assigned
    );

    if (!deletedGrade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    res.json({ message: "Grade deleted successfully", deletedGrade });
  } catch (err) {
    console.error("Error deleting grade:", err);
    res.status(500).json({ error: "Failed to delete grade" });
  }
};

module.exports = {
  addGrade,
  getGradesByClass,
  deleteGrade,
};
