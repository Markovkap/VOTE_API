const crypto = require("crypto");
const Vote = require("../models/Vote");

function vote(email, choice) {
  if (!email || typeof choice !== "number") {
    return createPromiceReject(
      "Будь ласка заповніть свою електрону пошту та зробіть вибір!!!"
    );
  }

  return Vote.findOne({ email })
    .exec()
    .then((vote) => {
      if (vote) {
        return createPromiceReject("Ви вже зробили свій вибір!");
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
          "Ваш голос збережений, для того, щоб він враховувався потрібно перейти за посиланням на пошті"
      });
    });
}

function verifyVote(hash) {
  if (!/[0-9a-f]{128}/.test(hash)) {
    return createPromiceReject("Пішов звідси розбійник");
  }

  return Vote.findOne({ hash })
    .exec()
    .then((vote) => {
      if (!vote) {
        return createPromiceReject("Пішов звідси довбень");
      }

      if (vote.verified) {
        return createPromiceReject("Ваш голос вже зарахований");
      }

      vote.verified = true;
      return vote.save();
    })
    .then(() => {
      return Promise.resolve({
        success: true,
        message: "Ваш голос зараховано"
      });
    });
}

function createPromiceReject(message) {
  return Promise.reject({
    success: false,
    message
  });
}

module.exports = {
  vote
};
