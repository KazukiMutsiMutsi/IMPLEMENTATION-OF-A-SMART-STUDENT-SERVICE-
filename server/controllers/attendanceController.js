/**
 * controllers/attendanceController.js
 */
const AttendanceModel = require("../models/attendanceModel");
const ConfigModel     = require("../models/configModel");

async function getMyAttendance(req, res, next) {
  try {
    const { student_id } = req.student;
    const { active_semester } = await ConfigModel.getEnrollmentConfig();

    const rows     = await AttendanceModel.findByStudentAndSemester(student_id, active_semester);
    const enriched = rows.map((r) => AttendanceModel.enrichRecord(r));

    res.json({ semester: active_semester, attendance: enriched });
  } catch (err) { next(err); }
}

module.exports = { getMyAttendance };
