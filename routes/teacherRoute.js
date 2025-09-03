// routes/teachers.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../db");

const router = express.Router();

// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/:id/upload-photo", upload.single("photo"), async (req, res) => {
  const teacherId = req.params.id;
  const photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  try {
    await pool.query("UPDATE teachers SET photo = $1 WHERE id = $2", [
      photoUrl,
      teacherId,
    ]);
    res.json({ photo: photoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
