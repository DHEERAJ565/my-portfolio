
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "primary",
      unique: true,
      immutable: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    shortBio: {
      type: String,
      default: "",
      maxlength: 500
    },

    about: {
      type: String,
      default: "",
      maxlength: 3000
    },

    education: {
      type: String,
      default: ""
    },

    focus: {
      type: String,
      default: ""
    },

    specialization: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    github: {
      type: String,
      default: ""
    },

    linkedin: {
      type: String,
      default: ""
    },

    profileImage: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Profile", profileSchema);