const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      velidate: {
        validator: (str) => {
          const re = new RegExp(
            '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))(@tl-kpi.kiev.ua)$'
          );
          return re.test(str);
        },
        message:
          "Електрона пошта повина бути вказана праильно(з доменом @tl-kpi.kiev.ua)"
      }
    },
    choice: {
      type: Number,
      velidate: {
        validator: (num) => num === 1 || num === 0,
        message: "Зробіть свій вибір"
      },
      required: true
    },
    verified: { type: Boolean, default: false },
    hash: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", votesSchema);
