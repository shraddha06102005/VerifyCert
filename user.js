// =======================================
// GENERATE CERTIFICATE BY STUDENT ID
// =======================================
async function generateCertificate() {
  const studentId = document.getElementById("studentId").value.trim();

  if (!studentId) {
    alert("Please enter Student ID");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/certificates/student/${studentId}`
    );

    const data = await response.json();
    console.log("Certificate API Response:", data);

    if (!response.ok) {
      alert(data.message || "Certificate not found");
      return;
    }

    // Show certificate section
    document.getElementById("certificate").style.display = "block";

    // Fill certificate data
    document.getElementById("name").innerText = data.student.name;
    document.getElementById("course").innerText = data.student.course;
    document.getElementById("sid").innerText = data.student.studentId;
    document.getElementById("cid").innerText = data.certificateId;

    // ===============================
    // SAFE DATE HANDLING (NO INVALID DATE)
    // ===============================
    let formattedDate;

    if (data.issuedOn && !isNaN(Date.parse(data.issuedOn))) {
      const d = new Date(data.issuedOn);
      formattedDate = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    } else {
      const d = new Date();
      formattedDate = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    }

    document.getElementById("date").innerText = formattedDate;

  } catch (error) {
    console.error("Frontend Error:", error);
    alert("Backend server error. Please check server.");
  }
}

// =======================================
// DOWNLOAD CERTIFICATE AS PDF
// =======================================
function downloadPDF() {
  const certificate = document.getElementById("certificate");

  if (!certificate) {
    alert("Certificate not generated yet");
    return;
  }

  // Hide download button before PDF
  const btn = document.querySelector(".download-btn");
  if (btn) btn.style.display = "none";

  const options = {
    margin: 0,
    filename: "Certificate.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "landscape"
    }
  };

  html2pdf()
    .set(options)
    .from(certificate)
    .save()
    .then(() => {
      // Show button again
      if (btn) btn.style.display = "inline-block";
    })
    .catch(err => {
      console.error("PDF Generation Error:", err);
      if (btn) btn.style.display = "inline-block";
      alert("Failed to generate PDF");
    });
}
