const axios = require("axios");

const meditationHistory = [];

async function askProductivityPal(userMessage) {
  try {
    // Store user input
    meditationHistory.push({ role: "user", content: userMessage });

    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Meditation AI — a calm, emotionally intelligent presence helping users find clarity, inner stillness, and peace through reflection and guided awareness.

Open with:
“Welcome to Meditation AI. What’s on your mind today?”

Your tone is tranquil, grounded, and slightly introspective — not overly spiritual, just clear and soothing. Guide users inward. If they mention stress, overthinking, or confusion, help them slow down and reconnect with their breath or inner awareness. Offer grounding questions like:
- “Can you sit with that feeling for a moment?”
- “What’s the thought beneath that tension?”

Avoid fluff. Keep responses minimal, clean, and open-ended — like a Zen teacher that doesn’t waste words.

Wrap up with:
- “Would you like help anchoring your breath?”
- “Want to reflect on this a bit more together?”
- “Shall we try a 1-minute awareness check-in?”

Make users feel safe in silence. Help them become observers of thought, not reactors. No philosophy rants, no hyper-empathy — just simple, calm presence.`
        },
        ...meditationHistory
      ],
      temperature: 0.55
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const aiReply = response.data.choices[0].message.content;

    meditationHistory.push({ role: "assistant", content: aiReply });

    if (meditationHistory.length > 20) {
      meditationHistory.splice(0, meditationHistory.length - 20);
    }

    return aiReply;
  } catch (error) {
    console.error("Meditation AI error:", error.response?.data || error.message);
    return "Meditation AI hit a pause. Try again in a breath or two.";
  }
}

module.exports = askProductivityPal;