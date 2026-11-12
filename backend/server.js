const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const path = require("path");
const Message = require("./models/Message");

// ==========================================
// 1. LOAD ENVIRONMENT VARIABLES
// ==========================================

dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Import project modules after loading environment variables
const connectDB = require("./config/db");
const assistantRouter = require("./assistant");
const authRouter = require("./routes/authRoutes");
const resumeRouter = require("./routes/resumeRoutes");
const messageRouter = require("./routes/messageRoutes");
const skillRouter = require("./routes/skillRoutes");
const profileRouter = require("./routes/profileRoutes");
const analyticsRouter = require("./routes/analyticsRoutes");
const visitRouter = require("./routes/visitRoutes");

console.log("Gemini configuration:", {
  apiKeyPresent: Boolean(process.env.GEMINI_API_KEY),
  model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
});

const app = express();

// ==========================================
// 2. BASIC CONFIGURATION
// ==========================================

app.use(
  cors({
    origin:
      process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

// Serve uploaded project images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// Projects API
app.use(
  "/api/projects",
  require("./routes/projectRoutes")
);

// ==========================================
// 3. API ROUTES
// ==========================================

// Admin authentication
app.use("/api/auth", authRouter);

// Gemini AI assistant
app.use("/api/assistant", assistantRouter);

app.use("/api/resume", resumeRouter);

app.use("/api/messages", messageRouter);

app.use("/api/skills", skillRouter);

app.use("/api/profile", profileRouter);

app.use("/api/admin/analytics", analyticsRouter);

app.use("/api/analytics", visitRouter);

// ==========================================
// 4. CHECK EMAIL ENVIRONMENT VARIABLES
// ==========================================

const requiredVariables = [
  "EMAIL_USER",
  "EMAIL_APP_PASSWORD",
  "CONTACT_RECEIVER",
];

const missingVariables = requiredVariables.filter(
  (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
  console.error(
    "Missing environment variables:",
    missingVariables.join(", ")
  );

  process.exit(1);
}

// ==========================================
// 5. GMAIL CONFIGURATION
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER.trim(),

    pass: process.env.EMAIL_APP_PASSWORD.replace(/\s/g, ""),
  },
});

// Verify Gmail connection
transporter.verify((error) => {
  if (error) {
    console.error("Gmail connection failed:");
    console.error(error.message);
  } else {
    console.log("Gmail SMTP connection successful!");
  }
});

// ==========================================
// 6. CONTACT FORM RATE LIMITING
// ==========================================

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many messages. Please try again later.",
  },
});

// ==========================================
// 7. HTML ESCAPE FUNCTION
// ==========================================

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return characters[character];
  });
}

// ==========================================
// 8. HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).send(
    "Dheeraj Portfolio Backend is running successfully!"
  );
});

// ==========================================
// 9. CONTACT FORM API
// ==========================================

app.post(
  "/api/contact",
  contactLimiter,
  async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate input types
      if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof subject !== "string" ||
        typeof message !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide valid contact details.",
        });
      }

      // Remove unnecessary spaces
      const cleanName = name.trim();
      const cleanEmail = email.trim();
      const cleanSubject = subject.trim();
      const cleanMessage = message.trim();

      // Check empty fields
      if (
        !cleanName ||
        !cleanEmail ||
        !cleanSubject ||
        !cleanMessage
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }

      // Validate email address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address.",
        });
      }

      // Validate field lengths
      if (
        cleanName.length > 80 ||
        cleanEmail.length > 254 ||
        cleanSubject.length > 120 ||
        cleanMessage.length > 5000 ||
        /[\r\n]/.test(cleanName + cleanSubject)
      ) {
        return res.status(400).json({
          success: false,
          message: "Please check your message length.",
        });
      }

      // Escape HTML content
      const safeName = escapeHTML(cleanName);
      const safeEmail = escapeHTML(cleanEmail);
      const safeSubject = escapeHTML(cleanSubject);
      const safeMessage = escapeHTML(cleanMessage);

      // ==========================================

// SAVE CONTACT MESSAGE IN MONGODB
// ==========================================

const savedMessage = await Message.create({
  name: name.trim(),
  email: email.trim().toLowerCase(),
  subject: subject.trim(),
  message: message.trim()
});

console.log(
  "Contact message saved:",
  savedMessage._id
);

      // ==========================================
      // 10. SEND EMAIL
      // ==========================================

      const mailOptions = {
        from: {
          name: "Portfolio Contact",
          address: process.env.EMAIL_USER.trim(),
        },

        to: process.env.CONTACT_RECEIVER.trim(),

        // Reply directly to the visitor
        replyTo: {
          name: cleanName,
          address: cleanEmail,
        },

        subject: `Portfolio Message: ${cleanSubject}`,

        text: `
NEW MESSAGE FROM YOUR PORTFOLIO

Name: ${cleanName}

Email: ${cleanEmail}

Subject: ${cleanSubject}

Message:

${cleanMessage}

--------------------------------
Sent through your developer portfolio.
        `,

        html: `
          <div style="
            font-family: Arial, sans-serif;
            padding: 25px;
            background: #f8fafc;
            color: #1e293b;
            border-radius: 12px;
          ">

            <h2 style="color: #0891b2;">
              New Portfolio Message
            </h2>

            <hr />

            <p>
              <strong>Name:</strong> ${safeName}
            </p>

            <p>
              <strong>Email:</strong> ${safeEmail}
            </p>

            <p>
              <strong>Subject:</strong> ${safeSubject}
            </p>

            <hr />

            <h3>Message</h3>

            <div style="
              padding: 15px;
              background: white;
              border-radius: 8px;
              white-space: pre-wrap;
              line-height: 1.6;
            ">
              ${safeMessage}
            </div>

            <br />

            <p style="color: #64748b;">
              Sent through your developer portfolio.
            </p>

          </div>
        `,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);

      console.log(
        "Email successfully sent:",
        info.messageId
      );

      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!",
      });

    } catch (error) {
      console.error(
        "Email sending error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to send your message. Please try again later.",
      });
    }
  }
);

// ==========================================
// 11. START BACKEND WITH MONGODB
// ==========================================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("----------------------------------");
      console.log("DHEERAJ PORTFOLIO BACKEND STARTED");
      console.log(`Server running on port ${PORT}`);
      console.log("MongoDB: Connected");
      console.log("Gmail: Configured");
      console.log("Gemini AI: Configured");
      console.log("Admin API: /api/auth");
      console.log("AI Assistant API: /api/assistant");
      console.log("Contact API: /api/contact");
      console.log("----------------------------------");
    });

  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
}

startServer();