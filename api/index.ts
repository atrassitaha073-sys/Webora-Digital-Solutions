import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { sendContactEmail } from "../server/email";
import { getChatbotResponse } from "../server/chatbot";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }
    const reply = await getChatbotResponse(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Failed to get chatbot response" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, plan, phone } = req.body;
    
    if (!email || !message) {
      return res.status(400).json({ error: "Email and message required" });
    }

    await sendContactEmail(name, email, message, plan, phone);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Serve static files
const distPath = path.resolve(__dirname, "../dist/public");

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

export default app;
