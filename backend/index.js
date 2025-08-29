// server.js
import express from "express";
import fetch from "node-fetch";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// ✅ GPT Route
app.post("/api/gpt", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`, // ✅ fixed with backtick
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error("❌ GPT Error:", err);
    res.status(500).json({ error: "GPT request failed" });
  }
});

// ✅ Gemini Route
// ✅ Gemini Route
app.post("/api/gemini", async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(400).json({ error: "Missing GEMINI_API_KEY" });
    }

    const { message } = req.body;

    // ✅ use v1beta + correct model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    console.log("✅ Gemini Success:", reply.substring(0, 50) + "...");
    res.json({ reply });
  } catch (err) {
    console.error("❌ Gemini Error:", err.response?.data || err.message);

    if (err.response?.data?.error) {
      const errorMsg = err.response.data.error.message || "Gemini API error";
      return res.status(400).json({ error: errorMsg });
    }

    res.status(500).json({ error: "Gemini request failed" });
  }
});

app.post("/api/perplexity", async (req, res) => {
  try {
    if (!PERPLEXITY_API_KEY) {
      return res.status(400).json({ error: "Missing PERPLEXITY_API_KEY" });
    }

    const { message } = req.body;

    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "sonar-pro",
        messages: [
          { role: "system", content: "Be precise and concise." },
          { role: "user", content: message },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`, // ✅ fixed with backtick
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const reply =
      response.data.choices?.[0]?.message?.content ||
      "No response from Perplexity";

    console.log("✅ Perplexity Success:", reply.substring(0, 50) + "...");
    res.json({ reply });
  } catch (err) {
    console.error("❌ Perplexity Error Details:", {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      headers: err.response?.headers,
    });

    if (err.response?.status === 401) {
      return res.status(401).json({ error: "Invalid Perplexity API key" });
    }

    res.status(500).json({ error: "Perplexity request failed" });
  }
});

// Status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    server: "running",
    timestamp: new Date().toISOString(),
    apis: {
      openai: !!OPENAI_API_KEY,
      gemini: !!GEMINI_API_KEY,
      perplexity: !!PERPLEXITY_API_KEY,
    },
  });
});

// Test endpoint
app.post("/api/test", async (req, res) => {
  const { provider } = req.body;
  const testMessage = "Hello, respond with just 'API working'";

  try {
    if (provider === "gemini") {
      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`; // ✅ backtick
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: testMessage }] }],
      });
      res.json({ success: true, response: response.data });
    } else if (provider === "perplexity") {
      const response = await axios.post(
        "https://api.perplexity.ai/chat/completions",
        {
          model: "sonar-pro",
          messages: [{ role: "user", content: testMessage }],
          max_tokens: 50,
        },
        {
          headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}` }, // ✅ backtick
        }
      );
      res.json({ success: true, response: response.data });
    } else {
      res.json({ error: "Unknown provider" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Multi-AI Server Running!",
    endpoints: [
      "/api/gpt",
      "/api/gemini",
      "/api/perplexity",
      "/api/status",
      "/api/test",
    ],
  });
});

app.listen(5000, () => {
  console.log("✅ Multi-AI Server running on http://localhost:5000");
  console.log(`🔑 OpenAI: ${OPENAI_API_KEY ? "✅ Ready" : "❌ Missing"}`); // ✅ backtick
  console.log(`🔑 Gemini: ${GEMINI_API_KEY ? "✅ Ready" : "❌ Missing"}`); // ✅ backtick
  console.log(`🔑 Perplexity: ${PERPLEXITY_API_KEY ? "✅ Ready" : "❌ Missing"}`); // ✅ backtick
  console.log("\n🧪 Test individual APIs:");
  console.log('POST /api/test with body: {"provider": "gemini"}');
  console.log('POST /api/test with body: {"provider": "perplexity"}');
});
