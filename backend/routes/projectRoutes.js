
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const Project = require("../models/Project");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// ==========================================
// UPLOAD DIRECTORY
// ==========================================

const uploadDirectory = path.join(
  __dirname,
  "..",
  "uploads",
  "projects"
);

fs.mkdirSync(uploadDirectory, {
  recursive: true
});

// ==========================================
// FILE STORAGE
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (req, file, callback) => {
    const extensions = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif"
    };

    const extension = extensions[file.mimetype];

    callback(
      null,
      `${Date.now()}-${crypto.randomUUID()}${extension}`
    );
  }
});

// ==========================================
// FILE VALIDATION
// ==========================================

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error("Only JPG, PNG, WEBP and GIF images are allowed.")
      );
    }

    callback(null, true);
  }
});

// Handle upload errors with JSON responses.
function handleImageUpload(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    next();
  });
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function parseTech(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.map(String).map((item) => item.trim()).filter(Boolean);
    }
  } catch {
    // Accept comma-separated technology names.
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function removeUploadedImage(imageUrl) {
  if (
    !imageUrl ||
    !imageUrl.startsWith("/uploads/projects/")
  ) {
    return;
  }

  const filename = path.basename(imageUrl);
  const filePath = path.join(uploadDirectory, filename);

  fs.unlink(filePath, (error) => {
    if (error && error.code !== "ENOENT") {
      console.error("Image deletion failed:", error.message);
    }
  });
}

function getImageUrl(file) {
  return file
    ? `/uploads/projects/${file.filename}`
    : "";
}

// ==========================================
// GET ALL PROJECTS
// PUBLIC API
// ==========================================

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });

  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve projects."
    });
  }
});

// ==========================================
// CREATE PROJECT
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  requireAdmin,
  handleImageUpload,
  async (req, res) => {
    try {
      const {
        title,
        type,
        description,
        github,
        liveDemo,
        order,
        featured
      } = req.body;

      if (!title?.trim() || !description?.trim()) {
        if (req.file) {
          removeUploadedImage(getImageUrl(req.file));
        }

        return res.status(400).json({
          success: false,
          message: "Project title and description are required."
        });
      }

      const project = await Project.create({
        title: title.trim(),
        type: type || "PROJECT",
        description: description.trim(),

        tech: parseTech(req.body.tech),

        github: github || "",
        liveDemo: liveDemo || "",

        image: getImageUrl(req.file),

        featured: featured === "true",

        order: Number(order) || 0
      });

      res.status(201).json({
        success: true,
        message: "Project created successfully.",
        project
      });

    } catch (error) {
      if (req.file) {
        removeUploadedImage(getImageUrl(req.file));
      }

      console.error("Create project error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to create project."
      });
    }
  }
);

// ==========================================
// UPDATE PROJECT
// ADMIN ONLY
// ==========================================

router.put(
  "/:id",
  requireAdmin,
  handleImageUpload,
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        if (req.file) {
          removeUploadedImage(getImageUrl(req.file));
        }

        return res.status(400).json({
          success: false,
          message: "Invalid project ID."
        });
      }

      const project = await Project.findById(req.params.id);

      if (!project) {
        if (req.file) {
          removeUploadedImage(getImageUrl(req.file));
        }

        return res.status(404).json({
          success: false,
          message: "Project not found."
        });
      }

      const {
        title,
        type,
        description,
        github,
        liveDemo,
        order,
        featured
      } = req.body;

      if (title !== undefined) {
        if (!title.trim()) {
          return res.status(400).json({
            success: false,
            message: "Project title cannot be empty."
          });
        }

        project.title = title.trim();
      }

      if (type !== undefined) {
        project.type = type;
      }

      if (description !== undefined) {
        if (!description.trim()) {
          return res.status(400).json({
            success: false,
            message: "Project description cannot be empty."
          });
        }

        project.description = description.trim();
      }

      if (req.body.tech !== undefined) {
        project.tech = parseTech(req.body.tech);
      }

      if (github !== undefined) {
        project.github = github;
      }

      if (liveDemo !== undefined) {
        project.liveDemo = liveDemo;
      }

      if (order !== undefined) {
        project.order = Number(order) || 0;
      }

      if (featured !== undefined) {
        project.featured = featured === "true";
      }

      const previousImage = project.image;

      if (req.file) {
        project.image = getImageUrl(req.file);
      }

      await project.save();

      if (req.file) {
        removeUploadedImage(previousImage);
      }

      res.status(200).json({
        success: true,
        message: "Project updated successfully.",
        project
      });

    } catch (error) {
      if (req.file) {
        removeUploadedImage(getImageUrl(req.file));
      }

      console.error("Update project error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to update project."
      });
    }
  }
);

// ==========================================
// DELETE PROJECT
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  requireAdmin,
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID."
        });
      }

      const project = await Project.findByIdAndDelete(
        req.params.id
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found."
        });
      }

      removeUploadedImage(project.image);

      res.status(200).json({
        success: true,
        message: "Project deleted successfully."
      });

    } catch (error) {
      console.error("Delete project error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to delete project."
      });
    }
  }
);

module.exports = router;