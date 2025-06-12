const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const OpenAI = require('openai');      // <-- без { }

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Инстанция на OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Грешка при OpenAI:', error);
    res.status(500).send('Възникна проблем при свързването с OpenAI.');
  }
});

// Health-check
app.get('/', (_req, res) => {
  res.send('GPT ботът е онлайн и работи!');
});

app.listen(port, () =>
  console.log(`Сървърът е стартиран на порт ${port}`)
);
