const express = require("express");
const router = express.Router();
const { getMyPayments, submitPayment } = require("../controllers/paymentsController");
const { authenticateStudent } = require("../middleware/authMiddleware");

router.use(authenticateStudent);

router.get("/",  getMyPayments);
router.post("/", submitPayment);

module.exports = router;
