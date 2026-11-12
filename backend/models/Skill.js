
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },

    type: {
      type: String,
      required: true,
      trim: true
    },

    icon: {
      type: String,
      default: "code",
      enum: [
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
      ]
    },

    level: {
      type: String,
      enum: ["Core", "Learning", "Exploring"],
      default: "Learning"
    },

    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Skill", skillSchema);