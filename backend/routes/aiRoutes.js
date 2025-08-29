// routes/aiRoutes.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

function sendProviderError(res, err, provider) {
  const status = err.response?.status || 500;
  const data = err.response?.data;
  const message =
    data?.error?.message ||
    data?.message ||
    (typeof data === "string" ? data : null) ||
    err.message ||
    "Unknown error";

  return res.status(status).json({
    error: { provider, status, message },
  });
}

// ---------- OpenAI ----------
router.post("/openai", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(400).json({
        error: { provider: "openai", message: "Missing OPENAI_API_KEY" },
      });
    }
    const { model, messages, max_tokens, temperature } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      { model, messages, max_tokens, temperature },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return res.json(response.data);
  } catch (err) {
    return sendProviderError(res, err, "openai");
  }
});

// ---------- Gemini ----------
router.post("/gemini", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: { provider: "gemini", message: "Missing GEMINI_API_KEY" },
      });
    }
    const { message } = req.body;

    // Works fine too, but you can upgrade to v1 1.5 models later
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      { contents: [{ parts: [{ text: message }] }] },
      { headers: { "Content-Type": "application/json" }, timeout: 30000 }
    );

    return res.json(response.data);
  } catch (err) {
    return sendProviderError(res, err, "gemini");
  }
});

// ---------- Perplexity ----------
router.post("/perplexity", async (req, res) => {
  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      return res.status(400).json({
        error: { provider: "perplexity", message: "Missing PERPLEXITY_API_KEY" },
      });
    }
    const { model, messages, max_tokens, temperature } = req.body;

    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      { model, messages, max_tokens, temperature },
      {
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`, // must start with ppx-
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 30000,
      }
    );

    return res.json(response.data);
  } catch (err) {
    return sendProviderError(res, err, "perplexity");
  }
});

// Optional: report which providers are configured
router.get("/status", (req, res) => {
  res.json({
    openai: !!process.env.OPENAI_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY,
    perplexity: !!process.env.PERPLEXITY_API_KEY,
  });
});

export default router;
