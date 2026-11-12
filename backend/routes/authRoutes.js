
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { rateLimit } = require("express-rate-limit");

const Admin = require("../models/Admin");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 8 * 60 * 60 * 1000,
};

// ==========================================
// ADMIN LOGIN
// ==========================================

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        sub: admin._id.toString(),
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.cookie("adminToken", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to complete login.",
    });
  }
});

// ==========================================
// CHECK AUTHENTICATION
// ==========================================

router.get("/me", requireAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    return res.json({
      success: true,
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to verify session.",
    });
  }
});

// ==========================================
// ADMIN LOGOUT
// ==========================================

router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
});

module.exports = router;