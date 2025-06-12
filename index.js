<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8" />
  <title>GPT Бот</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    #chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      max-height: 90vh;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 12px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    #header {
      background: #007bff;
      color: white;
      padding: 10px;
      font-weight: bold;
      cursor: pointer;
    }
    #messages {
      padding: 10px;
      overflow-y: auto;
      flex: 1;
    }
    .message {
      margin: 5px 0;
    }
    .user {
      font-weight: bold;
    }
    #form {
      display: flex;
      border-top: 1px solid #ccc;
    }
    #message-input {
      flex: 1;
      border: none;
      padding: 10px;
      font-size: 14px;
      resize: none;
    }
    #send-button {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="chat-container">
    <div id="header">Чат Бот консултант</div>
    <div id="messages">
      <div class="message">Здравейте! Как мога да ви помогна днес?</div>
    </div>
    <form id="form">
      <textarea id="message-input" placeholder="Въведи съобщение..." rows="2"></textarea>
      <button type="submit" id="send-button">Изпрати</button>
    </form>
  </div>

  <script>
    const form = document.getElementById('form');
    const input = document.getElementById('message-input');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userMessage = input.value.trim();
      if (!userMessage) return;

      const userDiv = document.createElement('div');
      userDiv.className = 'message user';
      userDiv.textContent = '🧑‍💼 ' + userMessage;
      messages.appendChild(userDiv);
      input.value = ''; // изчисти полето

      try {
        const response = await fetch('https://gpt-bot-0cs6.onrender.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        const botDiv = document.createElement('div');
        botDiv.className = 'message';
        botDiv.textContent = '🤖 ' + data.reply;
        messages.appendChild(botDiv);
      } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message';
        errorDiv.textContent = '⚠️ Възникна грешка при комуникацията с GPT.';
        messages.appendChild(errorDiv);
      }

      messages.scrollTop = messages.scrollHeight; // автоматично превъртане
    });
  </script>
</body>
</html>
