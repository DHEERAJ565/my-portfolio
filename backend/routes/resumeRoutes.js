
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const Resume = require("../models/Resume");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// ==========================================
// RESUME STORAGE DIRECTORY
// ==========================================

const resumeDirectory = path.join(
  __dirname,
  "..",
  "storage",
  "resume"
);

fs.mkdirSync(resumeDirectory, {
  recursive: true
});

// ==========================================
// MULTER STORAGE
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, resumeDirectory);
  },

  filename: (req, file, callback) => {
    callback(
      null,
      `${crypto.randomUUID()}.pdf`
    );
  }
});

// ==========================================
// PDF VALIDATION
// ==========================================

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024
  },

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype !== "application/pdf" ||
      path.extname(file.originalname).toLowerCase() !== ".pdf"
    ) {
      return callback(
        new Error("Only PDF files are allowed.")
      );
    }

    callback(null, true);
  }
});

// ==========================================
// UPLOAD ERROR HANDLER
// ==========================================

function handleResumeUpload(req, res, next) {
  upload.single("resume")(req, res, (error) => {
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
// FILE MANAGEMENT
// ==========================================

function removeResumeFile(filename) {
  if (
    !filename ||
    path.basename(filename) !== filename ||
    !/^[a-f0-9-]+\.pdf$/i.test(filename)
  ) {
    return;
  }

  const filePath = path.join(
    resumeDirectory,
    filename
  );

  fs.unlink(filePath, (error) => {
    if (error && error.code !== "ENOENT") {
      console.error(
        "Resume deletion error:",
        error.message
      );
    }
  });
}

function getSafeFilename(filename) {
  return path.resolve(resumeDirectory, filename);
}

// ==========================================
// PDF CONTENT VALIDATION
// ==========================================

async function isValidPDF(filePath) {
  let handle;

  try {
    handle = await fs.promises.open(filePath, "r");

    const buffer = Buffer.alloc(5);

    const result = await handle.read(
      buffer,
      0,
      5,
      0
    );

    return (
      result.bytesRead === 5 &&
      buffer.toString("ascii") === "%PDF-"
    );

  } catch {
    return false;

  } finally {
    if (handle) {
      await handle.close().catch(() => {});
    }
  }
}

// ==========================================
// GET RESUME INFORMATION
// PUBLIC
// ==========================================

router.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      key: "primary"
    }).lean();

    if (
      !resume ||
      !fs.existsSync(getSafeFilename(resume.filename))
    ) {
      return res.status(200).json({
        success: true,
        hasResume: false,
        resume: null
      });
    }

    res.json({
      success: true,
      hasResume: true,

      resume: {
        originalName: resume.originalName,
        fileSize: resume.fileSize,
        uploadedAt: resume.uploadedAt,

        downloadUrl: "/api/resume/download",
        previewUrl: "/api/resume/preview"
      }
    });

  } catch (error) {
    console.error("Get resume error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve resume."
    });
  }
});

// ==========================================
// DOWNLOAD RESUME
// PUBLIC
// ==========================================

router.get("/download", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      key: "primary"
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "No resume is currently available."
      });
    }

    const filePath = getSafeFilename(resume.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found."
      });
    }

    res.setHeader(
      "X-Content-Type-Options",
      "nosniff"
    );

    res.download(
      filePath,
      resume.originalName
    );

  } catch (error) {
    console.error("Resume download error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Unable to download resume."
      });
    }
  }
});

// ==========================================
// PREVIEW RESUME
// PUBLIC
// ==========================================

router.get("/preview", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      key: "primary"
    });

    if (!resume) {
      return res.status(404).send("Resume not found.");
    }

    const filePath = getSafeFilename(resume.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Resume file not found.");
    }

    const safeName = resume.originalName
      .replace(/["\r\n]/g, "_");

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${safeName}"`
    );

    res.setHeader(
      "X-Content-Type-Options",
      "nosniff"
    );

    res.setHeader(
      "Cache-Control",
      "no-store"
    );

    res.sendFile(filePath);

  } catch (error) {
    console.error("Resume preview error:", error);

    if (!res.headersSent) {
      res.status(500).send("Unable to preview resume.");
    }
  }
});

// ==========================================
// UPLOAD / REPLACE RESUME
// ADMIN ONLY
// ==========================================

router.post(
  "/upload",
  requireAdmin,
  handleResumeUpload,
  async (req, res) => {
    let uploadedFilename = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select a PDF file."
        });
      }

      uploadedFilename = req.file.filename;

      // Check the actual file signature.
      const validPDF = await isValidPDF(req.file.path);

      if (!validPDF) {
        removeResumeFile(uploadedFilename);

        return res.status(400).json({
          success: false,
          message: "The selected file is not a valid PDF."
        });
      }

      const safeOriginalName = path
        .basename(req.file.originalname)
        .replace(/[\r\n"]/g, "_")
        .slice(0, 150);

      const previousResume = await Resume.findOne({
        key: "primary"
      });

      // Save new resume information.
      const savedResume = await Resume.findOneAndUpdate(
        {
          key: "primary"
        },
        {
          $set: {
            filename: uploadedFilename,
            originalName: safeOriginalName,
            fileSize: req.file.size,
            uploadedAt: new Date()
          }
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true
        }
      );

      // Delete previous file only after database update succeeds.
      if (
        previousResume &&
        previousResume.filename !== uploadedFilename
      ) {
        removeResumeFile(previousResume.filename);
      }

      res.status(200).json({
        success: true,

        message: previousResume
          ? "Resume replaced successfully."
          : "Resume uploaded successfully.",

        resume: {
          originalName: savedResume.originalName,
          fileSize: savedResume.fileSize,
          uploadedAt: savedResume.uploadedAt
        }
      });

    } catch (error) {
      if (uploadedFilename) {
        removeResumeFile(uploadedFilename);
      }

      console.error("Resume upload error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to upload resume."
      });
    }
  }
);

// ==========================================
// DELETE RESUME
// ADMIN ONLY
// ==========================================

router.delete(
  "/",
  requireAdmin,
  async (req, res) => {
    try {
      const resume = await Resume.findOneAndDelete({
        key: "primary"
      });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "No resume found."
        });
      }

      removeResumeFile(resume.filename);

      res.json({
        success: true,
        message: "Resume deleted successfully."
      });

    } catch (error) {
      console.error("Resume deletion error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to delete resume."
      });
    }
  }
);

module.exports = router;