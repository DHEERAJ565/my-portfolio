
const express = require("express");

const crypto = require("crypto");

const { rateLimit } = require("express-rate-limit");

const PortfolioVisit = require("../models/PortfolioVisit");

const router = express.Router();

// ==========================================
// RATE LIMITING
// ==========================================

const visitLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  limit: 120,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many tracking requests."
  }

});

// ==========================================
// ALLOWED PORTFOLIO SECTIONS
// ==========================================

const allowedSections = new Set([
  "home",
  "about",
  "skills",
  "projects",
  "terminal",
  "contact"
]);

// ==========================================
// RECORD VISITOR ACTIVITY
// ==========================================

router.post(
  "/visit",
  visitLimiter,
  async (req, res) => {

    try {

      const {
        visitorId,
        eventType,
        section
      } = req.body;

      // VALIDATE VISITOR ID

      if (
        typeof visitorId !== "string" ||
        visitorId.length < 10 ||
        visitorId.length > 100
      ) {

        return res.status(400).json({
          success: false,
          message: "Invalid visitor identifier."
        });

      }

      // VALIDATE EVENT TYPE

      if (!["page", "section"].includes(eventType)) {

        return res.status(400).json({
          success: false,
          message: "Invalid event type."
        });

      }

      // VALIDATE SECTION

      if (
        eventType === "section" &&
        !allowedSections.has(section)
      ) {

        return res.status(400).json({
          success: false,
          message: "Invalid portfolio section."
        });

      }

      // HASH VISITOR IDENTIFIER

      const visitorHash = crypto
        .createHash("sha256")
        .update(visitorId)
        .digest("hex");

      // SAVE EVENT

      await PortfolioVisit.create({

        visitorHash,

        eventType,

        path: "/",

        section:
          eventType === "section"
            ? section
            : ""

      });

      return res.status(201).json({

        success: true,

        message: "Visitor activity recorded."

      });

    } catch (error) {

      console.error(
        "Visitor tracking error:",
        error
      );

      return res.status(500).json({

        success: false,

        message: "Unable to record visitor activity."

      });

    }

  }
);

module.exports = router;