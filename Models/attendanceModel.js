const db = require('../config/db');

// Save attendance entries (batch insert or update)
const saveAttendance = async (attendanceData) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const values = [];
    const placeholders = [];
    let i = 1;

    for (const record of attendanceData) {
      const { student_id, class_assigned, date, status } = record;
      values.push(student_id, class_assigned, date, status);
      placeholders.push(`($${i}, $${i + 1}, $${i + 2}, $${i + 3})`);
      i += 4;
    }

    const query = `
      INSERT INTO attendance (student_id, class_assigned, date, status)
      VALUES ${placeholders.join(', ')}
      ON CONFLICT (student_id, date)
      DO UPDATE SET status = EXCLUDED.status
    `;

    await client.query(query, values);
    await client.query('COMMIT');
    return { message: 'Attendance saved successfully' };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Transaction error:", error);
    throw error;
  } finally {
    client.release();
  }
};

// Get attendance records for a class on a given date
const getAttendanceByClassAndDate = async (classAssigned, date) => {
  const result = await db.query(
    `SELECT a.*, s.name FROM attendance a
     JOIN students s ON a.student_id = s.id
     WHERE a.class_assigned = $1 AND a.date = $2`,
    [classAssigned, date]
  );
  return result.rows;
};

module.exports = {
  saveAttendance,
  getAttendanceByClassAndDate
};
