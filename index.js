<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>GPT Бот</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f2f2f2;
      margin: 0;
      padding: 0;
    }
    #chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    #chat-header {
      background: #007bff;
      color: white;
      padding: 10px;
      cursor: pointer;
    }
    #chat-body {
      display: none;
      padding: 10px;
    }
    textarea {
      width: 100%;
      height: 60px;
      padding: 5px;
      box-sizing: border-box;
      resize: none;
    }
    button {
      margin-top: 5px;
      padding: 8px 12px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    #response {
      margin-top: 10px;
      padding: 10px;
      background: #e9f1ff;
      border-radius: 5px;
    }
  </style>
</head>
<body>

<div id="chat-container">
  <div id="chat-header" onclick="toggleChat()">Чат Бот консултант</div>
  <div id="chat-body">
    <h3>GPT Бот</h3>
    <textarea id="message" placeholder="Въведи въпрос..."></textarea>
    <button onclick="sendMessage()">Изпрати</button>
    <div id="response"></div>
  </div>
</div>

<script>
  const apiUrl = "https://gpt-bot-0cs6.onrender.com/chat"; // твоя backend URL

  function toggleChat() {
    const body = document.getElementById("chat-body");
    body.style.display = body.style.display === "none" ? "block" : "none";
  }

  async function sendMessage() {
    const messageInput = document.getElementById("message");
    const responseDiv = document.getElementById("response");
    const message = messageInput.value.trim();

    if (!message) return;

    responseDiv.innerText = "Моля, изчакай...";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      responseDiv.innerText = data.reply;
      messageInput.value = ""; // 🟢 Тук изчистваме полето след изпращане
    } catch (error) {
      responseDiv.innerText = "Възникна грешка при комуникацията с GPT.";
      console.error(error);
    }
  }

  // Показваме бота отворен по подразбиране:
  document.getElementById("chat-body").style.display = "block";
</script>

</body>
</html>
