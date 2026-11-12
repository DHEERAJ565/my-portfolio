
const mongoose = require("mongoose");

const portfolioVisitSchema = new mongoose.Schema(
  {
    visitorHash: {
      type: String,
      required: true,
      index: true
    },

    eventType: {
      type: String,
      enum: ["page", "section"],
      required: true,
      index: true
    },

    path: {
      type: String,
      default: "/",
      maxlength: 200
    },

    section: {
      type: String,
      default: "",
      maxlength: 60
    }
  },
  {
    timestamps: true
  }
);

portfolioVisitSchema.index({
  createdAt: 1,
  eventType: 1
});

portfolioVisitSchema.index({
  visitorHash: 1,
  createdAt: 1
});

module.exports = mongoose.model(
  "PortfolioVisit",
  portfolioVisitSchema
);