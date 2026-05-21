const express = require("express");
const router = express.Router();
const { login, logout, me } = require("../controllers/authController");
const { authenticateStudent } = require("../middleware/authMiddleware");

router.post("/login",  login);
router.post("/logout", logout);
router.get("/me",      authenticateStudent, me);

module.exports = router;
