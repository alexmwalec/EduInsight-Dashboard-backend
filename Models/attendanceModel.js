const db = require('../config/db'); // Your PostgreSQL pool connection

const saveAttendance = async (attendanceData) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    for (const record of attendanceData) {
      const { student_id, class_assigned, date, status } = record;

      await client.query(
        'INSERT INTO attendance (student_id, class_assigned, date, status) VALUES ($1, $2, $3, $4)',
        [student_id, class_assigned, date, status]
      );
    }

    await client.query('COMMIT');
    return { message: 'Attendance saved successfully' };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

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
