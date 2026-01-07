const router = require("express").Router();
const multer = require("multer");
const { uploadStudents } = require("../controllers/studentController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadStudents);

module.exports = router;
