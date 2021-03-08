const { Router } = require("express");
const voteConroller = require("../controllers/vote");

const api = new Router();
const voteApi = new Router();

api.use("/", voteApi);

// voteApi.post("/vote", (req, res) => {
//   // const { email, choice } = req.body;

//   // voteConroller
//   //   .vote(email, choice)
//   //   .then((result) => {
//   //     res.json({
//   //       success: result.success,
//   //       message: result.message,
//   //       exists: result.exists,
//   //       vote: result.vote
//   //     });
//   //   })
//   //   .catch((error) => {
//   //     res.json({
//   //       success: false,
//   //       message: error.message
//   //     });
//   //   });

//   res.send("VOTE API NOT IMPLEMENTED");
// });

module.exports = api;
