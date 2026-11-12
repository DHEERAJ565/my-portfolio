const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

async function resetAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "ADMIN_EMAIL or ADMIN_PASSWORD is missing."
      );
    }

    if (password.length < 12) {
      throw new Error(
        "Password must contain at least 12 characters."
      );
    }

    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 12);

    // Find existing admin account
    let admin = await Admin.findOne({ role: "admin" });

    if (admin) {
      admin.email = email;
      admin.password = hashedPassword;

      await admin.save();

      console.log("Admin account updated successfully!");

    } else {
      await Admin.create({
        email,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin account created successfully!");
    }

    console.log("--------------------------------");
    console.log("ADMIN PASSWORD RESET SUCCESSFUL");
    console.log("Email:", email);
    console.log("Password: securely hashed");
    console.log("--------------------------------");

  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
}

resetAdmin();