<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>GPT Бот</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet" />
  <style>
    body { background:#f5f5f5 }
    #chatCard { position:fixed; bottom:90px; right:30px; width:340px; display:none }
    #toggleBtn { position:fixed; bottom:20px; right:20px }
  </style>
</head>
<body>
  <!-- Чат карта -->
  <div id="chatCard" class="card shadow">
    <div class="card-body">
      <h4 class="card-title mb-3">GPT Бот</h4>
      <textarea id="userInput" class="form-control mb-2" rows="4" placeholder="Напиши съобщение"></textarea>
      <button id="sendBtn" class="btn btn-primary w-100 mb-2">Изпрати</button>
      <div id="responseBox" class="alert alert-light" style="display:none"></div>
    </div>
  </div>

  <!-- Бутон за отваряне/скриване -->
  <button id="toggleBtn" class="btn btn-primary">Чат Бот консултант</button>

  <script>
    const BOT_URL = 'https://gpt-bot-0cs6.onrender.com/chat'; // <-- адресът на бекенда

    const toggleBtn   = document.getElementById('toggleBtn');
    const chatCard    = document.getElementById('chatCard');
    const sendBtn     = document.getElementById('sendBtn');
    const userInput   = document.getElementById('userInput');
    const responseBox = document.getElementById('responseBox');

    toggleBtn.onclick = () => {
      chatCard.style.display = (chatCard.style.display === 'none') ? 'block' : 'none';
    };

    sendBtn.onclick = async () => {
      const message = userInput.value.trim();
      if (!message) return;

      responseBox.style.display = 'block';
      responseBox.className = 'alert alert-info';
      responseBox.textContent = 'Секунда…';

      try {
        const res = await fetch(BOT_URL, {
          method:'POST',
          headers:{ 'Content-Type':'application/json' },
          body:JSON.stringify({ message })
        });
        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        responseBox.className = 'alert alert-success';
        responseBox.textContent = data.reply;
      } catch (err) {
        console.error(err);
        responseBox.className = 'alert alert-danger';
        responseBox.textContent = 'Възникна грешка при комуникацията с GPT.';
      }
    };
  </script>
</body>
</html>
