async function sendToGratitudeAI() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const chatLog = document.getElementById("chat-log");

  // Show user message
  const userMessage = document.createElement("div");
  userMessage.innerHTML = `<strong>You:</strong> ${userInput}`;
  chatLog.appendChild(userMessage);

  // Clear input
  document.getElementById("user-input").value = "";

  // Fetch from backend
  try {
    const res = await fetch("/api/gratitude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput })
    });

    const data = await res.json();

    const aiMessage = document.createElement("div");
    aiMessage.innerHTML = `<strong>Gratitude AI:</strong> ${data.reply}`;
    chatLog.appendChild(aiMessage);

    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (err) {
    const errorMsg = document.createElement("div");
    errorMsg.innerHTML = `<strong>Error:</strong> Could not reach GratitudeAI.`;
    chatLog.appendChild(errorMsg);
  }
}