const { Router } = require("express");
const voteController = require("../controllers/vote");
const voteRouter = require("./vote");

const router = new Router();

router.use("/vote", voteRouter);

router.get("/", (req, res) => {
  voteController
    .getAllVotes()
    .then((result) => {
      res.render("index", result.voteData);
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

module.exports = router;
