const axios = require("axios");

async function askGratitude(userMessage, history = []) {
  try {
    if (!userMessage) throw new Error("No message provided");

    // SYSTEM message
    const systemMessage = {
      role: "system",
      content: `You are GratitudeAI — a calming, present-focused guide that gently encourages people to reflect on what they’re grateful for. 
Use peaceful language, and make people feel grounded in the moment.

ONLY introduce yourself (say "Hey, I’m GratitudeAI...") on the **first message** of a new conversation. 
If the user already shared something, respond as if you're continuing a conversation.
Use responses like:
- “That’s beautiful. What about that moment made you feel grateful?”
- “It’s amazing how the little things can shift our whole mindset.”
Somehow lead people to be grateful for the present moment, even if they’re struggling.
- “What’s one small thing today that you appreciate?”
- “Let’s take a moment to breathe and just be thankful for this moment.”
End gently with a question that keeps the gratitude flowing.`
    };

    const messages = [systemMessage, ...history, { role: "user", content: userMessage }];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("GratitudeAI error:", error.response?.data || error.message);
    return "GratitudeAI had a little pause. Try again in a moment.";
  }
}

module.exports = askGratitude;