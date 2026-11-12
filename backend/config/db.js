const mongoose = require("mongoose");

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully!");
    console.log("Database: dheeraj_portfolio");

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

module.exports = connectDB;