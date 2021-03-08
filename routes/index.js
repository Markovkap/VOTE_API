const { Router } = require("express");
const voteConroller = require("../controllers/vote");

const router = new Router();
const indexRouter = new Router();

router.use("/", indexRouter);

indexRouter.get("/", (req, res) => {
  res.render("index", { okResult: 95, notOkResult: 5 });
  // res.send("INDEX PAGE NOT IMPLEMENTED");
});

indexRouter.post("/vote", (req, res) => {
  const { email, choice } = req.body;

  voteConroller
    .vote(email, choice)
    .then((result) => {
      res.json({
        success: result.success,
        message: result.message,
        exists: result.exists,
        vote: result.vote
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: error.message
      });
    });

  // res.send("VOTE API NOT IMPLEMENTED");
});

module.exports = router;
