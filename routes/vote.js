const { Router } = require("express");
const voteController = require("../controllers/vote");

const voteRouter = new Router();

voteRouter.post("/", (req, res) => {
  const { email, choice } = req.body;

  voteController
    .vote(email, choice, req.headers.host)
    .then((result) => {
      res.json({
        success: result.success,
        message: result.message,
        exists: result.exists,
        vote: result.vote
      });
    })
    .catch((error) => {
      if (error.errors) {
        if (error.errors.choice) {
          error = error.errors.choice;
        }

        if (error.errors.email) {
          error = error.errors.email;
        }
      }

      res.json({
        success: false,
        message: error.message
      });
    });
});

voteRouter.get("/verify/:hash", (req, res) => {
  voteController
    .verifyVote(req.params.hash)
    .then((result) => {
      res.render("index", result.voteData);
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

module.exports = voteRouter;
