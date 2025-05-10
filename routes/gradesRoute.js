//Add to routes/gradeRoutes.js 
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all grades
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM grades ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Get grades error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
