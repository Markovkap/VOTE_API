const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Vote = require("../models/Vote");

function vote(email, choice, host) {
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
      console.log(host);
      return sendMail(savedVote.email, `${host}vote/verify/${savedVote.hash}`);
    })
    .then(() => {
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
      return getAllVotes("Ваш голос зараховано!");
    });
}

function createPromiceReject(message) {
  return Promise.reject({
    success: false,
    message
  });
}

function getAllVotes(message) {
  return Promise.all([
    Vote.countDocuments({ verified: true }).exec(),
    Vote.countDocuments({ verified: true, choice: 1 }).exec(),
    Vote.countDocuments({ verified: true, choice: 0 }).exec()
  ]).then(([all, ok, notOk]) => {
    const okResult = Math.round((ok / all) * 100);
    return Promise.resolve({
      success: true,
      voteData: {
        okResult,
        notOkResult: 100 - okResult,
        message
      }
    });
  });
}

async function sendMail(to, url) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_LOGIN, // generated ethereal user
      pass: process.env.EMAIL_PASS // generated ethereal password
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Vote System Notification" <eda44@ethereal.email>', // sender address
    to, // list of receivers
    subject: "Підтвердження голосу", // Subject line
    text: `Привіт, перейди за цим посиланням, щоб підтвердити голос ${url}`, // plain text body
    html: `<b>Привіт, перейди за цим посиланням, щоб підтвердити голос <a target="_blank" href="${url}"></a></b>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  vote,
  verifyVote,
  getAllVotes
};
