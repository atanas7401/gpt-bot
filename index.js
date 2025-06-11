const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Създаване на инстанция на OpenAI с ключа от .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error('Грешка при OpenAI заявката:', error);
    res.status(500).send('Възникна проблем при свързването с OpenAI.');
  }
});

app.get('/', (req, res) => {
  res.send('GPT ботът е онлайн и работи!');
});

app.listen(port, () => {
  console.log(`Сървърът е стартиран на http://localhost:${port}`);
});
