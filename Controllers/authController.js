const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// teacher login
const loginTeacher = async (req, res) => {
  const { full_name, class_assigned, subject, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM teachers WHERE LOWER(full_name) = LOWER($1) AND LOWER(class_assigned) = LOWER($2) AND LOWER(subject) = LOWER($3)",
      [full_name, class_assigned, subject]
    );

    const teacher = result.rows[0];

    if (!teacher) {
      return res.status(401).json({ message: "Invalid name, class or subject" });
    }

    const valid = await bcrypt.compare(password, teacher.password);
    if (!valid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: teacher.id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      teacher: {
        id: teacher.id,
        full_name: teacher.full_name,
        class_assigned: teacher.class_assigned,
        subject: teacher.subject,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const signupTeacher = async (req, res) => {
  const { full_name, class_assigned, subject, password } = req.body;

  if (!full_name || !class_assigned || !subject || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await pool.query(
      "SELECT * FROM teachers WHERE LOWER(full_name) = LOWER($1) AND LOWER(class_assigned) = LOWER($2) AND LOWER(subject) = LOWER($3)",
      [full_name, class_assigned, subject]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Teacher already exists with this subject and class" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO teachers (full_name, class_assigned, subject, password) VALUES ($1, $2, $3, $4)",
      [full_name, class_assigned, subject, hashedPassword]
    );

    res.status(201).json({ message: " " });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginTeacher,
  signupTeacher,
};
