
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

async function createAdmin() {
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
        "Admin password must contain at least 12 characters."
      );
    }

    await connectDB();

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("--------------------------------");
    console.log("ADMIN ACCOUNT CREATED");
    console.log("Email:", email);
    console.log("Password: securely hashed");
    console.log("--------------------------------");

  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();