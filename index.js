<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <title>GPT Бот</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f0f0f0;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      height: 100vh;
      margin: 0;
      padding: 20px;
    }

    .chat-container {
      width: 350px;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }

    h2 {
      margin: 0 0 10px;
    }

    textarea {
      width: 100%;
      height: 60px;
      padding: 10px;
      resize: none;
      margin-bottom: 10px;
    }

    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }

    .response-area {
      margin-top: 10px;
      padding: 10px;
      background: #e9f0fa;
      border-radius: 4px;
      overflow-y: auto;
      height: 200px;
    }

    .chat-message {
      margin-bottom: 10px;
    }

    .chat-message.user {
      font-weight: bold;
    }

    .chat-message.bot {
      color: #333;
    }
  </style>
</head>
<body>
  <div class="chat-container">
    <h2>GPT Бот</h2>
    <textarea id="userInput" placeholder="Напиши въпрос..."></textarea>
    <button onclick="sendMessage()">Изпрати</button>
    <div class="response-area" id="chatBox"></div>
  </div>

  <script>
    async function sendMessage() {
      const inputField = document.getElementById('userInput');
      const chatBox = document.getElementById('chatBox');
      const message = inputField.value.trim();

      if (message === '') return;

      const userDiv = document.createElement('div');
      userDiv.className = 'chat-message user';
      userDiv.textContent = 'Вие: ' + message;
      chatBox.appendChild(userDiv);

      inputField.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;

      try {
        const response = await fetch('https://gpt-bot-0cs6.onrender.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-message bot';
        botDiv.textContent = 'Бот: ' + data.reply;
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

      } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'chat-message bot';
        errorDiv.textContent = '⚠️ Възникна грешка при комуникацията с GPT.';
        chatBox.appendChild(errorDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }
  </script>
</body>
</html>
