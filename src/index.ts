import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { EmailService } from "./services/EmailService";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Initialize email service
const emailService = new EmailService();

// ✅ GET / route for browser
app.get("/", (req: Request, res: Response) => {
  res.send("✅ Email service is running. Use POST /send-email to send emails.");
});

// ✅ POST /send-email route
app.post("/send-email", async (req: Request, res: Response) => {
  try {
    const { to, subject, body, idempotencyKey } = req.body;

    if (!to || !subject || !body || !idempotencyKey) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const success = await emailService.sendEmail({ to, subject, body, idempotencyKey });
    console.log("✅ Email send result:", success);

    res.json({ success });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
