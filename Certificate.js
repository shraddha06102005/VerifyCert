const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  studentId: String,
  certificateId: String,
  issuedOn: Date
});

module.exports = mongoose.model("Certificate", certificateSchema);
