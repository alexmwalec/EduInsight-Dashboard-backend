const pool = require('../db');

// Get students by class
const getStudentsByClass = async (req, res) => {
  const { class_assigned } = req.query;

  try {
    const result = await pool.query(
      'SELECT id, name FROM students WHERE class = $1',
      [class_assigned]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch students error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save attendance
const recordAttendance = async (req, res) => {
  const { date, class_assigned, records } = req.body;

  try {
    for (const { student_id, status } of records) {
      await pool.query(
        'INSERT INTO attendance (student_id, date, status, class_assigned) VALUES ($1, $2, $3, $4)',
        [student_id, date, status, class_assigned]
      );
    }

    res.status(201).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error('Attendance save error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStudentsByClass, recordAttendance };
