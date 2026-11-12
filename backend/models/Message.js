const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", messageSchema);