/**
 * controllers/gradesController.js
 */
const GradeModel  = require("../models/gradeModel");
const ConfigModel = require("../models/configModel");

async function getMyGrades(req, res, next) {
  try {
    const { student_id } = req.student;
    const { active_semester } = await ConfigModel.getEnrollmentConfig();

    const rows     = await GradeModel.findByStudentAndSemester(student_id, active_semester);
    const enriched = rows.map((r) => GradeModel.enrichGrade(r));
    const gwa      = rows.length ? GradeModel.computeGWA(rows) : null;

    res.json({
      semester: active_semester,
      grades:   enriched,
      gwa:      gwa !== null ? gwa : "N/A",
    });
  } catch (err) { next(err); }
}

module.exports = { getMyGrades };
