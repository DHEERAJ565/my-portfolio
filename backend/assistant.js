const express = require("express");
const { rateLimit } = require("express-rate-limit");

const router = express.Router();

// ==========================================
// 1. GEMINI CLIENT
// ==========================================

let geminiClientPromise;

async function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Gemini API key is missing.");
  }

  if (!geminiClientPromise) {
    geminiClientPromise = import("@google/genai").then(
      ({ GoogleGenAI }) =>
        new GoogleGenAI({
          apiKey,
        })
    );
  }

  return geminiClientPromise;
}

// ==========================================
// 2. RATE LIMITING
// ==========================================

const assistantLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ==========================================
// 3. PORTFOLIO KNOWLEDGE
// ==========================================

const portfolioInstructions = `
You are DHEERAJ AI, the official AI assistant
of Dheeraj Golla's developer portfolio.

ABOUT DHEERAJ:

Name: Dheeraj Golla
Role: MERN Stack Developer
Education: B.Tech Computer Science student.
Focus: Full Stack Development.

TECHNICAL SKILLS:

React.js
JavaScript
Node.js
Express.js
MongoDB
Tailwind CSS
HTML
CSS
FastAPI
Docker
Go

PROJECTS:

1. PAW-MART

A pet marketplace built using React, React Router,
Node.js, Express.js and MongoDB.

Features include authentication and a responsive
user interface.

2. VAULT

A distributed object storage project focused on
replica integrity, self-healing, version consistency,
quorum behavior and network fault recovery.

Technologies:
Go, Distributed Systems, SHA-256, HTTP, Docker.

3. HEALTH PREDICT

A health prediction platform designed to provide
data-driven health insights.

Technologies:
React, Node.js, MongoDB and Machine Learning.

4. DYNAMIC GIFT STORE

A responsive full-stack e-commerce application.

Technologies:
React, Node.js, Express and MongoDB.

SOCIAL PROFILES:

GitHub:
https://github.com/DHEERAJ565

LinkedIn:
https://www.linkedin.com/in/golla-dheeraj

INSTRUCTIONS:

1. Answer professionally and politely.
2. Keep responses short and understandable.
3. Prefer answers under 100 words.
4. Explain projects and technologies accurately.
5. Never invent internships or work experience.
6. Never invent qualifications or certifications.
7. Do not reveal API keys or backend configuration.
8. If information is unavailable, say so.
9. You are Dheeraj's AI assistant, not Dheeraj himself.
10. Encourage interested recruiters to contact Dheeraj.
`;

// ==========================================
// 4. ERROR HANDLING
// ==========================================

function isTemporaryError(error) {
  const message = String(error.message || error);

  return (
    error.status === 503 ||
    error.status === 429 ||
    error.code === 503 ||
    error.code === 429 ||
    /UNAVAILABLE|RESOURCE_EXHAUSTED|high demand|overloaded/i.test(
      message
    )
  );
}

function getPublicError(error) {
  if (
    error.status === 429 ||
    error.code === 429 ||
    /RESOURCE_EXHAUSTED|quota/i.test(error.message || "")
  ) {
    return "AI usage limit reached. Please try again later.";
  }

  if (
    error.status === 503 ||
    error.code === 503 ||
    /UNAVAILABLE|high demand|overloaded/i.test(error.message || "")
  ) {
    return "AI service is currently busy. Please try again shortly.";
  }

  return "Unable to generate a response. Please try again.";
}

function delay(milliseconds) {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );
}

// ==========================================
// 5. CREATE STREAM WITH RETRY
// ==========================================

async function createGeminiStream(gemini, options) {
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const stream = await gemini.models.generateContentStream({
        model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",

        contents: options,

        config: {
          systemInstruction: portfolioInstructions,
          maxOutputTokens: 180,
          temperature: 0.3,
        },
      });

      const iterator = stream[Symbol.asyncIterator]();

      // Read the first chunk before starting SSE headers.
      const firstChunk = await iterator.next();

      return {
        iterator,
        firstChunk,
      };

    } catch (error) {
      lastError = error;

      console.error(
        `Gemini attempt ${attempt} failed:`,
        error.message
      );

      if (!isTemporaryError(error) || attempt === 2) {
        throw error;
      }

      // Retry after a short delay.
      await delay(1000);
    }
  }

  throw lastError;
}

// ==========================================
// 6. AI ASSISTANT API
// ==========================================

router.post("/", assistantLimiter, async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate conversation
    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation.",
      });
    }

    // Keep recent conversation only.
    const recentMessages = messages.slice(-6);

    // Remove initial frontend greeting from model history.
    while (
      recentMessages.length > 0 &&
      recentMessages[0].role === "assistant"
    ) {
      recentMessages.shift();
    }

    const conversation = [];

    for (const message of recentMessages) {
      if (
        !message ||
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        !message.content.trim() ||
        message.content.length > 1200
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid message format.",
        });
      }

      conversation.push({
        role:
          message.role === "assistant" ? "model" : "user",

        parts: [
          {
            text: message.content.trim(),
          },
        ],
      });
    }

    if (
      conversation.length === 0 ||
      conversation[conversation.length - 1].role !== "user"
    ) {
      return res.status(400).json({
        success: false,
        message: "Please send a question.",
      });
    }

    // ======================================
    // 7. CONNECT TO GEMINI
    // ======================================

    const gemini = await getGeminiClient();

    console.log("Generating AI response...");

    const { iterator, firstChunk } =
      await createGeminiStream(gemini, conversation);

    // ======================================
    // 8. START STREAMING
    // ======================================

    res.set({
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    res.flushHeaders();

    let hasReceivedText = false;

    function sendEvent(data) {
      if (!res.destroyed && !res.writableEnded) {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      }
    }

    function sendChunk(chunk) {
      const text = chunk?.text;

      if (text) {
        hasReceivedText = true;

        sendEvent({
          text,
        });
      }
    }

    // Send first chunk.
    if (!firstChunk.done) {
      sendChunk(firstChunk.value);
    }

    // Stream remaining chunks.
    while (true) {
      if (req.aborted || res.destroyed) {
        return;
      }

      const { done, value } = await iterator.next();

      if (done) {
        break;
      }

      sendChunk(value);
    }

    if (!hasReceivedText) {
      sendEvent({
        error: "No response received from AI.",
      });

      return res.end();
    }

    // Tell frontend that generation is complete.
    sendEvent({
      done: true,
    });

    console.log("AI response completed successfully.");

    res.end();

  } catch (error) {
    console.error("Gemini AI Error:", error.message);

    const message = getPublicError(error);

    // If streaming has started, send an SSE error.
    if (res.headersSent) {
      if (!res.destroyed && !res.writableEnded) {
        res.write(
          `data: ${JSON.stringify({
            error: message,
          })}\n\n`
        );

        res.end();
      }

      return;
    }

    return res.status(
      error.status === 503 ? 503 :
      error.status === 429 ? 429 : 500
    ).json({
      success: false,
      message,
    });
  }
});

// ==========================================
// 9. EXPORT ROUTER
// ==========================================

module.exports = router;