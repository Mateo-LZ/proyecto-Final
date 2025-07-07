require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

// ⚠️ Render asigna el puerto por la variable de entorno PORT
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./")); // Sirve archivos estáticos como index.html

// ✅ Ruta de prueba opcional para verificar conexión a Mistral
app.get("/test-mistral", async (req, res) => {
  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-medium",
        messages: [{ role: "user", content: "Hola" }]
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Fallo en test de Mistral:", err);
    res.status(500).send("❌ No se pudo conectar con Mistral");
  }
});

// 🔁 Ruta principal para el chatbot
app.post("/api/mistral", async (req, res) => {
  const { prompt } = req.body;

  // Log para verificar si la API KEY fue recibida
  console.log("🔐 API KEY recibida:", process.env.MISTRAL_API_KEY ? "Sí" : "❌ No");

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-medium",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const respuesta = data?.choices?.[0]?.message?.content || "❌ Sin respuesta útil de la IA.";
    res.json({ respuesta });

  } catch (error) {
    console.error("❌ Error al consultar Mistral:", error);
    res.status(500).json({ respuesta: `❌ Error al conectar con Mistral: ${error.message}` });
  }
});

// 🟢 Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
