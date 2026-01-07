const express = require("express");
const router = express.Router();

const {
  getCertificateByStudentId,
  searchCertificate
} = require("../controllers/certificateController");

// USER SIDE – get certificate by student ID
router.get("/student/:studentId", getCertificateByStudentId);

// SEARCH CERTIFICATE
router.get("/search/:certificateId", searchCertificate);

module.exports = router;
