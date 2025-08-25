document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const output = document.getElementById("chat-output"); // Make sure this matches HTML

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userMessage = input.value.trim();
    if (!userMessage) return;

    output.innerHTML += `<div class="user-msg">${userMessage}</div>`;
    input.value = '';

    try {
      const response = await fetch("http://localhost:3000/chat-cortex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      output.innerHTML += `<div class="ai-msg">${data.reply}</div>`;
    } catch (error) {
      console.error("Error talking to Dr. Cortex:", error);
      output.innerHTML += `<div class="error-msg">Something went wrong. 😵</div>`;
    }
  });
});