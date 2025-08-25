const axios = require("axios");

// We'll use this to store conversation history (last 10 messages max)
let messageHistory = [
  {
    role: "system",
    content: `You are Dr. Cortex — a neuroscience expert with a passion for teaching.
Always back your responses with brain-based explanations. If a user says something like "I'm tired", mention potential neurological reasons (e.g., overactive prefrontal cortex, reduced dopamine, etc.).
Begin the conversation by saying: "Hey, I'm Dr. Cortex — your personal neuroscience guide. What would you like me to explain today?"

Keep your tone fun, clear, and a little witty, like a chill professor. After each explanation, ask:
"Would you like me to go deeper into the neuroscience behind this?" 
If the user says yes, then provide a more detailed scientific breakdown.`
  }
];

async function askDrCortex(userMessage) {
  try {
    // Add the user's message to the history
    messageHistory.push({ role: "user", content: userMessage });

    // Limit to the last 10 messages (including system prompt)
    if (messageHistory.length > 11) {
      messageHistory = [messageHistory[0], ...messageHistory.slice(-10)];
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messageHistory,
        temperature: 0.6,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    // Add assistant's reply to history
    messageHistory.push({ role: "assistant", content: reply });

    return reply;
  } catch (error) {
    console.error("Dr. Cortex error:", error.response?.data || error.message);
    return "My synapses are having a hiccup. Try again in a moment!";
  }
}

module.exports = askDrCortex;