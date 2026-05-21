const express = require("express");
const router = express.Router();
const { getMyGrades } = require("../controllers/gradesController");
const { authenticateStudent } = require("../middleware/authMiddleware");

router.use(authenticateStudent);
router.get("/", getMyGrades);

module.exports = router;
