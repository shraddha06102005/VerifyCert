// MUST be global (not inside DOMContentLoaded)
async function searchCertificate() {
  const certificateId =
    document.getElementById("certificateId").value;

  if (!certificateId) {
    alert("Please enter Certificate ID");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/certificates/search/${certificateId}`
    );

    const data = await res.json();
    console.log(data); // DEBUG

    if (!res.ok) {
      alert(data.message);
      return;
    }

    document.getElementById("result").style.display = "block";
    document.getElementById("name").innerText = data.student.name;
    document.getElementById("course").innerText = data.student.course;
    document.getElementById("sid").innerText = data.student.studentId;
    document.getElementById("cid").innerText = data.certificateId;
    document.getElementById("date").innerText =
      new Date(data.issuedOn).toLocaleDateString();

  } catch (error) {
    console.error(error);
    alert("Backend server not running");
  }
}
