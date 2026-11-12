
const express = require("express");
const mongoose = require("mongoose");

const Message = require("../models/Message");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// ==========================================
// GET ALL MESSAGES
// ADMIN ONLY
// ==========================================

router.get("/", requireAdmin, async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(250)
      .lean();

    const unreadCount = await Message.countDocuments({
      isRead: false
    });

    res.status(200).json({
      success: true,
      total: messages.length,
      unreadCount,
      messages
    });

  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve messages."
    });
  }
});

// ==========================================
// MARK MESSAGE AS READ / UNREAD
// ADMIN ONLY
// ==========================================

router.patch(
  "/:id/read",
  requireAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid message ID."
        });
      }

      if (typeof req.body.isRead !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isRead must be true or false."
        });
      }

      const updatedMessage = await Message.findByIdAndUpdate(
        id,
        {
          $set: {
            isRead: req.body.isRead
          }
        },
        {
          new: true,
          runValidators: true
        }
      );

      if (!updatedMessage) {
        return res.status(404).json({
          success: false,
          message: "Message not found."
        });
      }

      res.json({
        success: true,
        message: req.body.isRead
          ? "Message marked as read."
          : "Message marked as unread.",
        data: updatedMessage
      });

    } catch (error) {
      console.error("Update message error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to update message."
      });
    }
  }
);

// ==========================================
// DELETE MESSAGE
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid message ID."
        });
      }

      const deletedMessage = await Message.findByIdAndDelete(id);

      if (!deletedMessage) {
        return res.status(404).json({
          success: false,
          message: "Message not found."
        });
      }

      res.json({
        success: true,
        message: "Message deleted successfully."
      });

    } catch (error) {
      console.error("Delete message error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to delete message."
      });
    }
  }
);

module.exports = router;