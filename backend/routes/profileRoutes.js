
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const Profile = require("../models/Profile");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// ==========================================
// DEFAULT PROFILE
// ==========================================

const defaultProfile = {
  key: "primary",
  name: "DHEERAJ GOLLA",
  title: "MERN STACK DEVELOPER",

  shortBio:
    "I build modern full-stack applications, interactive digital experiences and AI-integrated software systems.",

  about:
    "I'm a Computer Science student focused on full-stack development and modern web technologies.\nI enjoy creating practical applications, experimenting with new technologies and solving real-world problems through software.\nMy current focus is building strong MERN development skills while exploring AI, distributed systems and scalable applications.",

  education: "B.Tech CSE",
  focus: "Full Stack Development",
  specialization: "MERN + AI",
  status: "OPEN TO INTERNSHIPS",

  email: "dheeraj72064@gmail.com",

  github: "https://github.com/DHEERAJ565",

  linkedin:
    "https://www.linkedin.com/in/golla-dheeraj",

  profileImage: ""
};

// ==========================================
// UPLOAD DIRECTORY
// ==========================================

const uploadDirectory = path.join(
  __dirname,
  "..",
  "uploads",
  "profile"
);

fs.mkdirSync(uploadDirectory, {
  recursive: true
});

// ==========================================
// IMAGE STORAGE
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (req, file, callback) => {
    const extension = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif"
    }[file.mimetype];

    callback(
      null,
      `${crypto.randomUUID()}${extension}`
    );
  }
});

// ==========================================
// IMAGE VALIDATION
// ==========================================

const upload = multer({
  storage,

  limits: {
    fileSize: 3 * 1024 * 1024
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
        new Error(
          "Only JPG, PNG, WEBP and GIF images are allowed."
        )
      );
    }

    callback(null, true);
  }
});

// ==========================================
// UPLOAD ERROR HANDLER
// ==========================================

function handleProfileUpload(req, res, next) {
  upload.single("profileImage")(req, res, (error) => {
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
// FILE HELPERS
// ==========================================

function getImageUrl(file) {
  return file
    ? `/uploads/profile/${file.filename}`
    : "";
}

async function isValidImage(filePath, mimetype) {
  let handle;

  try {
    handle = await fs.promises.open(filePath, "r");

    const buffer = Buffer.alloc(12);

    const result = await handle.read(
      buffer,
      0,
      12,
      0
    );

    const bytes = buffer.subarray(0, result.bytesRead);

    if (mimetype === "image/jpeg") {
      return (
        bytes.length >= 3 &&
        bytes[0] === 0xff &&
        bytes[1] === 0xd8 &&
        bytes[2] === 0xff
      );
    }

    if (mimetype === "image/png") {
      return bytes.subarray(0, 8).equals(
        Buffer.from([
          0x89, 0x50, 0x4e, 0x47,
          0x0d, 0x0a, 0x1a, 0x0a
        ])
      );
    }

    if (mimetype === "image/webp") {
      return (
        bytes.subarray(0, 4).toString() === "RIFF" &&
        bytes.subarray(8, 12).toString() === "WEBP"
      );
    }

    if (mimetype === "image/gif") {
      const signature = bytes.subarray(0, 6).toString();

      return (
        signature === "GIF87a" ||
        signature === "GIF89a"
      );
    }

    return false;

  } catch {
    return false;

  } finally {
    if (handle) {
      await handle.close().catch(() => {});
    }
  }
}

function removeProfileImage(imageUrl) {
  if (
    !imageUrl ||
    !imageUrl.startsWith("/uploads/profile/")
  ) {
    return;
  }

  const filename = path.basename(imageUrl);

  if (!/^[a-f0-9-]+\.(jpg|png|webp|gif)$/i.test(filename)) {
    return;
  }

  const filePath = path.join(
    uploadDirectory,
    filename
  );

  fs.unlink(filePath, (error) => {
    if (error && error.code !== "ENOENT") {
      console.error(
        "Profile image deletion error:",
        error.message
      );
    }
  });
}

// ==========================================
// GET PUBLIC PROFILE
// PUBLIC
// ==========================================

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      key: "primary"
    }).lean();

    res.status(200).json({
      success: true,

      profile: profile || defaultProfile
    });

  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve profile."
    });
  }
});

// ==========================================
// UPDATE PROFILE
// ADMIN ONLY
// ==========================================

router.put(
  "/",
  requireAdmin,
  handleProfileUpload,
  async (req, res) => {
    let uploadedImage = null;

    try {
      const {
        name,
        title,
        shortBio,
        about,
        education,
        focus,
        specialization,
        status,
        email,
        github,
        linkedin,
        removeProfileImage
      } = req.body;

      if (!name?.trim() || !title?.trim() || !email?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name, title and email are required."
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address."
        });
      }

      if (github && !/^https?:\/\//i.test(github)) {
        return res.status(400).json({
          success: false,
          message: "GitHub link must start with http:// or https://."
        });
      }

      if (linkedin && !/^https?:\/\//i.test(linkedin)) {
        return res.status(400).json({
          success: false,
          message: "LinkedIn link must start with http:// or https://."
        });
      }

      if (req.file) {
        uploadedImage = getImageUrl(req.file);

        const validImage = await isValidImage(
          req.file.path,
          req.file.mimetype
        );

        if (!validImage) {
          removeProfileImage(uploadedImage);
          uploadedImage = null;

          return res.status(400).json({
            success: false,
            message: "The uploaded file is not a valid image."
          });
        }
      }

      const previousProfile = await Profile.findOne({
        key: "primary"
      });

      const previousImage =
        previousProfile?.profileImage || "";

      const updates = {
        name: name.trim(),
        title: title.trim(),
        shortBio: shortBio || "",
        about: about || "",
        education: education || "",
        focus: focus || "",
        specialization: specialization || "",
        status: status || "",
        email: email.trim().toLowerCase(),
        github: github || "",
        linkedin: linkedin || ""
      };

      if (req.file) {
        updates.profileImage = uploadedImage;
      } else if (removeProfileImage === "true") {
        updates.profileImage = "";
      }

      const savedProfile = await Profile.findOneAndUpdate(
        {
          key: "primary"
        },
        {
          $set: updates,
          $setOnInsert: {
            key: "primary"
          }
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true
        }
      );

      if (
        (req.file || removeProfileImage === "true") &&
        previousImage
      ) {
        removeProfileImageFile(previousImage);
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        profile: savedProfile
      });

    } catch (error) {
      if (uploadedImage) {
        removeProfileImage(uploadedImage);
      }

      console.error("Update profile error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to update profile."
      });
    }
  }
);

// ==========================================
// IMAGE DELETION HELPER
// ==========================================

function removeProfileImageFile(imageUrl) {
  removeProfileImage(imageUrl);
}

module.exports = router;