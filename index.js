// index.js
require('dotenv').config(); // Load variables from .env

if (!process.env.OPENAI_API_KEY) {
  console.log("❌ API KEY is missing");
} else {
  console.log("✅ API KEY loaded:", process.env.OPENAI_API_KEY.slice(0, 8) + "...");
}

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const askDrCortex = require("./cortex.agent");
const askPathfinder = require("./askPathfinder");
const askNeuroBuddy = require("./askNeuroBuddy");
const askMeditationAI = require("./askProductivityPal"); // Reusing the file for Meditation AI
const askReverie = require("./askReverie");
const askGratitude = require("./askGratitude");


const app = express();
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.static("public"));

// Histories for memory (10 messages each)
const cortexHistory = [];
const neurobuddyHistory = [];
const pathfinderHistory = [];
const gratitudeHistory = [];
const reverieHistory = [];
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body?.message;
    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ error: "Invalid user message" });
    }
    const response = await askDrCortex(userMessage);
    res.json({ reply: response });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/chat-cortex", async (req, res) => {
  try {
    const userMessage = req.body?.message;
    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ error: "Invalid user message" });
    }

    const response = await askDrCortex(userMessage, cortexHistory);

    cortexHistory.push({ role: "user", content: userMessage });
    cortexHistory.push({ role: "assistant", content: response });

    if (cortexHistory.length > 10) {
      cortexHistory.splice(0, cortexHistory.length - 10);
    }

    res.json({ reply: response });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/neurobuddy", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ error: "Invalid user message" });
    }

    const reply = await askNeuroBuddy(userMessage, neurobuddyHistory);

    neurobuddyHistory.push({ role: "user", content: userMessage });
    neurobuddyHistory.push({ role: "assistant", content: reply });

    if (neurobuddyHistory.length > 10) {
      neurobuddyHistory.splice(0, neurobuddyHistory.length - 10);
    }

    res.json({ reply });
  } catch (error) {
    console.error("Error in /neurobuddy route:", error);
    res.status(500).send("NeuroBuddy had a little brain freeze.");
  }
});

app.post("/pathfinder", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ error: "Invalid user message" });
    }

    const reply = await askPathfinder(userMessage, pathfinderHistory);

    pathfinderHistory.push({ role: "user", content: userMessage });
    pathfinderHistory.push({ role: "assistant", content: reply });

    if (pathfinderHistory.length > 10) {
      pathfinderHistory.splice(0, pathfinderHistory.length - 10);
    }

    res.json({ reply });
  } catch (error) {
    console.error("Pathfinder AI error:", error);
    res.status(500).json({ error: "Pathfinder is thinking too hard. Try again later." });
  }
});

app.post("/productivity", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ error: "Invalid user message" });
    }

    const reply = await askMeditationAI(userMessage, meditationHistory);

    meditationHistory.push({ role: "user", content: userMessage });
    meditationHistory.push({ role: "assistant", content: reply });

    if (meditationHistory.length > 10) {
      meditationHistory.splice(0, meditationHistory.length - 10);
    }

    res.json({ reply });
  } catch (error) {
    console.error("MeditationAI error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/reverie", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ error: "Invalid user message" });
    }

    // Push user message
    reverieHistory.push({ role: "user", content: userMessage });

    // Get AI reply based on full history
    const aiReply = await askReverie(userMessage, reverieHistory);

    // Push AI reply
    reverieHistory.push({ role: "assistant", content: aiReply });

    // Cap at 10 messages
    if (reverieHistory.length > 10) {
      reverieHistory.splice(0, reverieHistory.length - 10);
    }

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Error in /reverie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/gratitude", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Optional: Track user message (if you want server-side tracking too)
    gratitudeHistory.push({ role: "user", content: userMessage });

    const aiReply = await askGratitude(userMessage, gratitudeHistory);

    // Optional: Store AI response in history
    gratitudeHistory.push({ role: "assistant", content: aiReply });

    // Keep only last 10 messages in memory
    if (gratitudeHistory.length > 10) {
      gratitudeHistory.splice(0, gratitudeHistory.length - 10);
    }

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("GratitudeAI route error:", err);
    res.status(500).json({ error: "Something went wrong with GratitudeAI." });
  }
});
const meditationHistory = [];


app.listen(3000, () => {
  console.log("GPT agent is live at http://localhost:3000");
});