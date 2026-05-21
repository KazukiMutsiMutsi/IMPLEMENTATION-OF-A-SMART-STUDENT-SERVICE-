const express = require("express");
const router  = express.Router();
const { getMyEnrollment, getAvailableSubjects, submitEnrollment } = require("../controllers/enrollmentController");
const { authenticateStudent } = require("../middleware/authMiddleware");

router.use(authenticateStudent);

router.get("/subjects", getAvailableSubjects); // list subjects with capacity
router.get("/",         getMyEnrollment);       // current semester enrollment
router.post("/",        submitEnrollment);       // submit new enrollment

module.exports = router;
