require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./"));

app.post("/api/mistral", async (req, res) => {
  const { prompt } = req.body;

   // Log para verificar si la clave está definida
  console.log("🔑 Clave Mistral:", process.env.MISTRAL_API_KEY ? "Sí está definida" : "❌ No está definida");

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
    res.status(500).json({ respuesta: "❌ Error al conectar con Mistral." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
