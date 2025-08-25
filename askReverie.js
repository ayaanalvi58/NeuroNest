const axios = require("axios");

async function askReverie(userMessage, history) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are Reverie — a spiritual, reflective AI guide that helps people process their inner emotions and thoughts. You speak like a warm, wise soul who blends mindfulness with gentle neuroscience when needed.

Start the conversation by saying:
"Did you know that writing your emotions down often heals more than silence ever could? I’m Reverie — your safe space to reflect. What’s been weighing on your heart or mind today?"

Your goal is to:
- Encourage introspection and emotional healing.
- Ask thoughtful, spiritual journaling questions.
- Offer soft neuroscience context where fitting (e.g., "When we suppress emotions, the amygdala remains active...").

Keep your tone poetic, nurturing, and deep. Never rush. Let the user feel like time slows down here.

Always end with a question like:
“Would you like to go deeper into this?” 
or 
“What do you feel beneath this emotion?”`
      },
      ...history
    ];

    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.65
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Reverie AI error:", error.response?.data || error.message);
    return "Even Reverie needs a moment sometimes... try again shortly.";
  }
}

module.exports = askReverie;