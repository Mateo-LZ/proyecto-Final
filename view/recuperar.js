let currentUser = null;

function showMessage(msg, isError = false) {
  const message = document.getElementById('message');
  message.textContent = msg;
  message.style.color = isError ? 'red' : 'lightgreen';
}

function getQuestionText(code) {
  const preguntas = {
    mascota: "¿Nombre de tu primera mascota?",
    ciudad: "¿Ciudad donde naciste?",
    color: "¿Tu color favorito?"
  };
  return preguntas[code] || "Pregunta desconocida";
}

async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function loadSecurityQuestion() {
  const username = document.getElementById('recoverUser').value.trim();
  const storedUser = localStorage.getItem(`user_${username}`);

  if (!storedUser) {
    showMessage("Usuario no encontrado.", true);
    return;
  }

  currentUser = JSON.parse(storedUser);
  document.getElementById('securityQuestionText').textContent = getQuestionText(currentUser.question);
  document.getElementById('securitySection').style.display = 'block';
}

async function validateAnswer() {
  const answer = document.getElementById('recoverAnswer').value.trim().toLowerCase();
  const hashedInput = await hashText(answer);

  if (hashedInput === currentUser.answer) {
    showMessage("Respuesta correcta.");
    document.getElementById('resetSection').style.display = 'block';
  } else {
    showMessage("Respuesta incorrecta.", true);
  }
}

async function resetPassword() {
  const newPass = document.getElementById('newPassword').value.trim();

  if (!newPass) {
    showMessage("Ingresa una nueva contraseña.", true);
    return;
  }

  const newHashedPass = await hashText(newPass);
  currentUser.password = newHashedPass;

  localStorage.setItem(`user_${currentUser.name}`, JSON.stringify(currentUser));
  showMessage("¡Contraseña actualizada correctamente!");

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
}
