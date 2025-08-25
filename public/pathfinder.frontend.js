async function sendToPathfinder() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatLog = document.getElementById('chat-log');
  chatLog.innerHTML += `<div class="user"><strong>You:</strong> ${message}</div>`;

  try {
    const response = await fetch('/pathfinder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (data.reply) {
      chatLog.innerHTML += `<div class="bot"><strong>Pathfinder:</strong> ${data.reply}</div>`;
    } else {
      chatLog.innerHTML += `<div class="error">⚠️ No reply from Pathfinder.</div>`;
    }
  } catch (error) {
    console.error("Frontend error:", error);
    chatLog.innerHTML += `<div class="error">💥 Something went wrong. Try again.</div>`;
  }

  input.value = '';
  chatLog.scrollTop = chatLog.scrollHeight; // auto-scroll to bottom
}