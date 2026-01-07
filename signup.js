async function signup() {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  } else {
    alert(data.message || "Registration failed");
  }
}
