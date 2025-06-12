<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>GPT Бот</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f2f2f2;
    }

    #chat-toggle {
      position: fixed;
      bottom: 10px;
      right: 10px;
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      z-index: 999;
    }

    #chat-box {
      position: fixed;
      bottom: 50px;
      right: 10px;
      width: 350px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      padding: 20px;
      display: none;
      flex-direction: column;
    }

    #chat-box h2 {
      margin-top: 0;
    }

    textarea {
      width: 100%;
      height: 80px;
      resize: none;
      margin-bottom: 10px;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
    }

    #response {
      margin-top: 15px;
      background: #e9f1ff;
      padding: 10px;
      border-radius: 5px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div id="chat-toggle">Чат Бот консултант</div>
  <div id="chat-box">
    <h2>GPT Бот</h2>
    <textarea id="message" placeholder="Задай въпрос тук..."></textarea>
    <button onclick="sendMessage()">Изпрати</button>
    <div id="response"></div>
  </div>

  <script>
    const BACKEND_URL = "https://gpt-bot-0cs6.onrender.com/chat"; // Твоят работещ backend

    document.getElementById('chat-toggle').onclick = () => {
      const box = document.getElementById('chat-box');
      box.style.display = (box.style.display === 'none' || box.style.display === '') ? 'flex' : 'none';
    };

    async function sendMessage() {
      const messageField = document.getElementById('message');
      const responseDiv = document.getElementById('response');
      const message = messageField.value.trim();

      if (!message) return;

      // Показваме временно съобщение „Изчакване...“
      responseDiv.innerHTML = "⏳ Изчакване на отговор...";

      try {
        const res = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        const data = await res.json();
        responseDiv.innerHTML = data.reply;
        messageField.value = ""; // 🧽 Изчистваме съобщението
      } catch (err) {
        responseDiv.innerHTML = "⚠️ Възникна грешка при комуникацията с GPT.";
      }
    }
  </script>
</body>
</html>
