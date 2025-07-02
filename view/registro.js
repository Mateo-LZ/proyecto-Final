const registerName = document.getElementById('registerName');
const registerPassword = document.getElementById('registerPassword');
const registerQuestion = document.getElementById('registerQuestion');
const registerAnswer = document.getElementById('registerAnswer');
const registerButton = document.getElementById('registerButton');
const messageElement = document.getElementById('message');

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

async function registerUser() {
  const name = registerName.value.trim();
  const password = registerPassword.value;
  const question = registerQuestion.value;
  const answer = registerAnswer.value.trim().toLowerCase();

  if (!name || !password || !question || !answer) {
    showMessage('Completa todos los campos.', true);
    return;
  }

  const hashedPassword = await hashText(password);
  const hashedAnswer = await hashText(answer);

  const user = {
    name,
    password: hashedPassword,
    question,
    answer: hashedAnswer
  };

  localStorage.setItem(`user_${name}`, JSON.stringify(user));
  showMessage('¡Registro exitoso! Redirigiendo...');

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
}

registerButton.addEventListener('click', registerUser);
