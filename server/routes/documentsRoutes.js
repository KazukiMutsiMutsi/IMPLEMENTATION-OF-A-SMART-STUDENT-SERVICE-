const express = require("express");
const router  = express.Router();
const { getMyDocuments, getDocumentTypes, submitDocumentRequest } = require("../controllers/documentsController");
const { authenticateStudent } = require("../middleware/authMiddleware");

router.use(authenticateStudent);

router.get("/types", getDocumentTypes);       // list supported document types
router.get("/",      getMyDocuments);          // request history
router.post("/",     submitDocumentRequest);   // submit new request

module.exports = router;
