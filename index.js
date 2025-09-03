require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoute");
const studentRoutes = require("./routes/studentRoute");
const gradeRoutes = require("./routes/gradesRoute");
const attendanceRoutes = require("./routes/attendanceRoute"); 

// Middlewares
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/attendance", attendanceRoutes); // optional if needed

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
