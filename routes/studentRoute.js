const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get students by class
router.get("/", async (req, res) => {
  const class_assigned = req.query.class_assigned;
  try {
    const result = await pool.query("SELECT * FROM students WHERE class = $1", [class_assigned]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;