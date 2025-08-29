// controllers/aiController.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const openaiHandler = async (req, res) => {
  try {
    const { model, messages, max_tokens, temperature } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      { model, messages, max_tokens, temperature },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ OpenAI Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export const geminiHandler = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: message }] }] }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Gemini Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export const perplexityHandler = async (req, res) => {
  try {
    const { model, messages, max_tokens, temperature } = req.body;

    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      { model, messages, max_tokens, temperature },
      { headers: { Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Perplexity Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};
