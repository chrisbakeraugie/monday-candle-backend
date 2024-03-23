const mongoose = require("mongoose");

const fragranceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: String,
    image_url: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Fragrance", fragranceSchema);
