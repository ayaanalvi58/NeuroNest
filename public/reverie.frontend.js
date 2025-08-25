async function sendToReverieAI() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (!message) return;

  // Display user message
  const chatLog = document.getElementById("chat-log");
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.innerText = message;
  chatLog.appendChild(userBubble);

  input.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/reverie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Display AI response
    const aiBubble = document.createElement("div");
    aiBubble.className = "chat-bubble ai";
    aiBubble.innerText = data.reply;
    chatLog.appendChild(aiBubble);

    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (err) {
    const errorBubble = document.createElement("div");
    errorBubble.className = "chat-bubble ai error";
    errorBubble.innerText = "Reverie had a moment... Try again shortly.";
    chatLog.appendChild(errorBubble);
  }
}