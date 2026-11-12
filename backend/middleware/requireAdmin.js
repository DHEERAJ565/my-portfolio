
const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Authentication configuration error.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access denied.",
      });
    }

    req.adminId = decoded.sub;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session.",
    });
  }
}

module.exports = requireAdmin;