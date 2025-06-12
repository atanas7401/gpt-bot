// === index.js (готов за поставяне) ============================
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app  = express();
const port = process.env.PORT || 3000;

// ──────────────────────────────
// Middlewares
// ──────────────────────────────
app.use(cors());             // разрешава заявки от всички домейни
app.use(bodyParser.json());

// ──────────────────────────────
// OpenAI
// ──────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ──────────────────────────────
// Routes
// ──────────────────────────────
app.post('/chat', async (req, res) => {
  const { message = '' } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).send('Error communicating with OpenAI');
  }
});

// health-check
app.get('/', (_req, res) => {
  res.send('GPT ботът е онлайн и работи!');
});

// ──────────────────────────────
app.listen(port, () => console.log(`Server listening on ${port}`));
// ===============================================================
