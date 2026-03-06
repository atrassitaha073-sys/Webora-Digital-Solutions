import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendContactEmail } from "./email";
import { getChatbotResponse } from "./chatbot";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Webora AI Chatbot route
  app.post("/api/chatbot", async (req, res, next) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const reply = await getChatbotResponse(message);
      res.json({ reply });
    } catch (error) {
      next(error);
    }
  });

  app.post(api.contact.submit.path, async (req, res, next) => {
    try {
      console.log('📬 Contact form received:', req.body);
      const input = api.contact.submit.input.parse(req.body);
      console.log('✅ Input validated successfully');
      
      // Try to save to database, but don't fail if it doesn't work
      let message: any = null;
      try {
        message = await storage.createContactMessage(input);
        console.log('✅ Message saved to database');
      } catch (dbError) {
        console.warn('⚠️ Database not available, continuing without saving:', dbError);
        // Create a mock message response if database is unavailable
        message = {
          id: Math.floor(Math.random() * 1000000),
          name: input.name,
          email: input.email,
          message: input.message,
          plan: input.plan,
          phone: input.phone,
          createdAt: new Date(),
        };
      }
      
      // Send email to admin when message is received
      try {
        console.log('📧 Attempting to send email...');
        await sendContactEmail({
          name: input.name,
          email: input.email,
          message: input.message,
          plan: input.plan,
          phone: input.phone,
        });
        console.log('✅ Email sent successfully!');
      } catch (emailError) {
        console.error('❌ Failed to send email notification:', emailError);
        // Return error if email fails
        return res.status(500).json({
          message: 'Failed to send email. Please try again.',
        });
      }
      
      res.status(201).json(message);
    } catch (err) {
      console.error('🔴 Route error:', err);
      
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      
      next(err);
    }
  });

  return httpServer;
}
