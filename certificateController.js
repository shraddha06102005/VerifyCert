const Student = require("../models/Student");
const Certificate = require("../models/Certificate");

// =======================================
// GET CERTIFICATE BY STUDENT ID (USER SIDE)
// =======================================
exports.getCertificateByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Find student
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // 2. Check if certificate already exists
    let certificate = await Certificate.findOne({
      student: student._id
    });

    // 3. IF NOT EXISTS → CREATE AUTOMATICALLY
    if (!certificate) {
      certificate = await Certificate.create({
        certificateId: "CERT-" + Date.now(),
        student: student._id
      });
    }

    // 4. Return certificate
    res.status(200).json({
      certificateId: certificate.certificateId,
      issuedOn: certificate.issuedOn,
      student: {
        studentId: student.studentId,
        name: student.name,
        course: student.course
      }
    });

  } catch (error) {
    console.error("CERTIFICATE GENERATION ERROR:", error);
    res.status(500).json({
      message: "Backend server error"
    });
  }
};


// =======================================
// SEARCH CERTIFICATE BY CERTIFICATE ID
// =======================================
exports.searchCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId })
      .populate("student");

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found"
      });
    }

    res.status(200).json({
      certificateId: certificate.certificateId,
      issuedOn: certificate.issuedOn,
      student: {
        studentId: certificate.student.studentId,
        name: certificate.student.name,
        course: certificate.student.course
      }
    });

  } catch (error) {
    console.error("SEARCH CERTIFICATE ERROR:", error);
    res.status(500).json({
      message: "Backend server error"
    });
  }
};
