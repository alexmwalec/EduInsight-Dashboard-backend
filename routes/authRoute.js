const express = require("express");
const router = express.Router();
const { signupTeacher, loginTeacher } = require("../Controllers/authController");

router.post("/signup", signupTeacher);
router.post("/login", loginTeacher);

module.exports = router;
