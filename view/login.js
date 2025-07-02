const loginName = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const messageElement = document.getElementById('message');
const savedNameDisplay = document.getElementById('savedNameDisplay');

function showMessage(msg, isError = false) {
  messageElement.textContent = msg;
  messageElement.style.color = isError ? 'red' : 'green';
  messageElement.style.display = 'block';
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 3000);
}

async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function loginUser() {
  const name = loginName.value.trim();
  const password = loginPassword.value;

  if (!name || !password) {
    showMessage('Completa todos los campos.', true);
    return;
  }

  const userData = JSON.parse(localStorage.getItem(`user_${name}`));
  const hashedInputPassword = await hashText(password);

  if (userData && userData.password === hashedInputPassword) {
    localStorage.setItem('sessionActive', 'true');
    localStorage.setItem('sessionUser', name);
    showMessage(`✅ Bienvenido, ${name}`);
    
    // --- REDIRECCIÓN AUTOMÁTICA A INICIO ---
    // Espera 1.5 segundos y luego redirige al usuario.
    setTimeout(() => {
        window.location.href = '/index.html'; // Asegúrate que esta ruta sea correcta
    }, 1500);
    // -----------------------------------------

    if (savedNameDisplay) {
      savedNameDisplay.textContent = `✅ Sesión activa como: ${name}`;
    }
  } else {
    showMessage('Usuario o contraseña incorrectos.', true);
  }
}

function loadSession() {
  const session = localStorage.getItem('sessionActive');
  const username = localStorage.getItem('sessionUser');

  if (session === 'true' && username && savedNameDisplay) {
    savedNameDisplay.textContent = `✅ Sesión activa como: ${username}`;
  }
}

function logoutUser() {
  localStorage.removeItem('sessionActive');
  localStorage.removeItem('sessionUser');
  showMessage('Sesión cerrada correctamente');
  if (savedNameDisplay) {
    savedNameDisplay.textContent = '';
  }
}

loginButton.addEventListener('click', loginUser);
if (logoutButton) logoutButton.addEventListener('click', logoutUser);
document.addEventListener('DOMContentLoaded', loadSession);