const crypto = require("crypto");
const Vote = require("../models/Vote");

function vote(email, choice) {
  if (!email || !choice) {
    return Promise.reject({
      success: false,
      message: "Будь ласка заповніть свою електрону пошту та зробіть вибір!!!"
    });
  }

  return Vote.findOne({ email })
    .exec()
    .then((vote) => {
      if (vote) {
        return Promise.reject({
          success: false,
          message: "Ви вже зробили свій вибір!"
        });
      }

      const newVote = new Vote({
        email,
        choice,
        hash: crypto.randomBytes(64).toString("hex")
      });

      return newVote.save();
    })
    .then((savedVote) => {
      return Promise.resolve({
        success: true,
        message:
          "Ваш голос збережений, для того, щоб він враховувався потрібно перейти за посиланням на пошті",
        vote: savedVote
      });
    });
}

module.exports = {
  vote
};
