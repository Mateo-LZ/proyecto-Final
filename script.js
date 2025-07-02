document.getElementById("chatbot-toggle").addEventListener("click", () => {
  document.getElementById("chatbot-box").classList.toggle("hidden");
});

document.getElementById("chatbot-send").addEventListener("click", async () => {
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");
  const pregunta = input.value.trim();

  if (pregunta === "") return;

  messages.innerHTML += `<div><strong>Tú:</strong> ${pregunta}</div>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/api/mistral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: pregunta })
    });

    const data = await res.json();
    messages.innerHTML += `<div><strong>IA:</strong> ${data.respuesta}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    messages.innerHTML += `<div><strong>IA:</strong> ❌ Error al conectar con Mistral.</div>`;
  }
});
