
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "primary",
      unique: true,
      immutable: true
    },

    filename: {
      type: String,
      required: true
    },

    originalName: {
      type: String,
      required: true
    },

    fileSize: {
      type: Number,
      required: true
    },

    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Resume", resumeSchema);