const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    choice: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    hash: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", votesSchema);
