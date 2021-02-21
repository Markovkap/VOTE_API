const { Router } = require("express");

const api = new Router();
const voteApi = new Router();

api.use("/", voteApi);

voteApi.post("/vote", (req, res) => {
  res.send("VOTE API NOT IMPLEMENTED");
});

module.exports = api;
