/**
 * models/attendanceModel.js
 */
const db = require("../config/db");

const AttendanceModel = {
  async findByStudentAndSemester(student_id, semester) {
    const [rows] = await db.query(
      `SELECT a.*, s.code AS subject_code, s.name AS subject_name
       FROM attendance a
       JOIN subjects s ON s.id = a.subject_id
       WHERE a.student_id = ? AND a.semester = ?`,
      [student_id, semester]
    );
    return rows;
  },

  enrichRecord(row) {
    const total    = row.total_meetings;
    const present  = row.days_present;
    const absences = total - present;

    let attendance_percentage = null;
    let warning = false;

    if (total > 0) {
      attendance_percentage = parseFloat(((present / total) * 100).toFixed(1));
      warning = attendance_percentage < 80;
    }

    return {
      subject_code:         row.subject_code,
      subject_name:         row.subject_name,
      total_meetings:       total,
      days_present:         present,
      absences,
      attendance_percentage,
      no_records:           total === 0,
      warning,
    };
  },
};

module.exports = AttendanceModel;
