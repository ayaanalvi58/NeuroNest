const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const output = document.getElementById('chat-output');
const sessionId = "neuro-" + crypto.randomUUID();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  output.innerHTML += `<div class="user-msg">${userMessage}</div>`;
  input.value = '';

  try {
    const res = await fetch('http://localhost:3000/neurobuddy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, sessionId })
    });

    const data = await res.json();
    output.innerHTML += `<div class="ai-msg">${data.reply}</div>`;
  } catch (err) {
    console.error(err);
    output.innerHTML += `<div class="ai-msg">Oops, something broke. Try again later.</div>`;
  }
});