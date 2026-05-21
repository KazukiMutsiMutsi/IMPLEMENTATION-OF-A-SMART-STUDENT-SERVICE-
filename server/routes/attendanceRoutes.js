const express = require("express");
const router = express.Router();
const { getMyAttendance } = require("../controllers/attendanceController");
const { authenticateStudent } = require("../middleware/authMiddleware");

router.use(authenticateStudent);
router.get("/", getMyAttendance);

module.exports = router;
