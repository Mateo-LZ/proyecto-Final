const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./")); // Sirve archivos como index.html

// RUTA PARA LLAMAR A LA API DE MISTRAL
app.post("/api/mistral", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer qu0F80ZDE9THEDWZxBaTC7vLHo5pU5Su", // Reemplaza con tu clave real
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
    res.status(500).json({ respuesta: "❌ Error al conectar con Mistral." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
