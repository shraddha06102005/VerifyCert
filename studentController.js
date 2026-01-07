const Student = require("../models/Student");
const xlsx = require("xlsx");

exports.uploadStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet);

    for (let row of rows) {
      await Student.create({
        studentId: row.studentId,
        name: row.name,
        email: row.email,
        course: row.course,
        rollNo: row.rollNo
      });
    }

    res.json({ message: "Students uploaded successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Excel import failed" });
  }
};
