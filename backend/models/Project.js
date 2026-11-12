
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    type: {
      type: String,
      default: "PROJECT",
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },

    tech: {
      type: [String],
      default: []
    },

    github: {
      type: String,
      default: "",
      trim: true
    },

    liveDemo: {
      type: String,
      default: "",
      trim: true
    },

    image: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false
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

module.exports = mongoose.model("Project", projectSchema);