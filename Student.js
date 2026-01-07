const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: String,
  email: String,
  course: String,
  rollNo: String
});

module.exports = mongoose.model("Student", studentSchema);
