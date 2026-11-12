
const express = require("express");
const mongoose = require("mongoose");

const Skill = require("../models/Skill");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

const allowedIcons = [
  "react",
  "javascript",
  "node",
  "express",
  "mongodb",
  "tailwind",
  "fastapi",
  "docker",
  "html",
  "css",
  "server",
  "code"
];

const allowedLevels = [
  "Core",
  "Learning",
  "Exploring"
];

// ==========================================
// GET ALL SKILLS
// PUBLIC
// ==========================================

router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    res.json({
      success: true,
      count: skills.length,
      skills
    });

  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve skills."
    });
  }
});

// ==========================================
// CREATE SKILL
// ADMIN ONLY
// ==========================================

router.post("/", requireAdmin, async (req, res) => {
  try {
    const {
      name,
      type,
      icon,
      level,
      order
    } = req.body;

    if (!name?.trim() || !type?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name and category are required."
      });
    }

    if (icon && !allowedIcons.includes(icon)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill icon."
      });
    }

    if (level && !allowedLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill level."
      });
    }

    const existing = await Skill.findOne({
      name: {
        $regex: `^${name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i"
      }
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This skill already exists."
      });
    }

    const skill = await Skill.create({
      name: name.trim(),
      type: type.trim(),
      icon: icon || "code",
      level: level || "Learning",
      order: Number(order) || 0
    });

    res.status(201).json({
      success: true,
      message: "Skill added successfully.",
      skill
    });

  } catch (error) {
    console.error("Create skill error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create skill."
    });
  }
});

// ==========================================
// UPDATE SKILL
// ADMIN ONLY
// ==========================================

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID."
      });
    }

    const {
      name,
      type,
      icon,
      level,
      order
    } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name cannot be empty."
      });
    }

    if (type !== undefined && !type.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill category cannot be empty."
      });
    }

    if (icon !== undefined && !allowedIcons.includes(icon)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill icon."
      });
    }

    if (level !== undefined && !allowedLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill level."
      });
    }

    const updates = {};

    if (name !== undefined) updates.name = name.trim();
    if (type !== undefined) updates.type = type.trim();
    if (icon !== undefined) updates.icon = icon;
    if (level !== undefined) updates.level = level;
    if (order !== undefined) updates.order = Number(order) || 0;

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found."
      });
    }

    res.json({
      success: true,
      message: "Skill updated successfully.",
      skill: updatedSkill
    });

  } catch (error) {
    console.error("Update skill error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update skill."
    });
  }
});

// ==========================================
// DELETE SKILL
// ADMIN ONLY
// ==========================================

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID."
      });
    }

    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found."
      });
    }

    res.json({
      success: true,
      message: "Skill deleted successfully."
    });

  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete skill."
    });
  }
});

module.exports = router;