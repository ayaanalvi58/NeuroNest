document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const sendButton = document.querySelector(".send-btn");

  sendButton.addEventListener("click", async () => {
    const message = input.value.trim();
    if (!message) return;

    chatLog.innerHTML += `<div class="user-message">🧘‍♂️ You: ${message}</div>`;
    input.value = "";

    try {
      const res = await fetch("/productivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      chatLog.innerHTML += `<div class="ai-message">✨ Productivity Pal: ${data.reply}</div>`;
    } catch (err) {
      chatLog.innerHTML += `<div class="error-message">⚠️ Error: MeditationAI is offline.</div>`;
    }

    chatLog.scrollTop = chatLog.scrollHeight;
  });
});