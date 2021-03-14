require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();

// Create servers
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", (error) => {
  // eslint-disable-next-line
  console.error("Database connection error:", error);
});

db.once("open", () => {
  // eslint-disable-next-line
  console.log("Database connected!");
});

// Use url body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public"));

//set pug as default engine
app.set("view engine", "pug");

// Use routers
app.use("/", routes);

// Start listening
server.listen(process.env.PORT, () => {
  // eslint-disable-next-line
  console.log(`App is listening on ${server.address().port}`);
});

// Handling unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  // eslint-disable-next-line
  console.error("Unhandled Rejection at:", promise);
  // eslint-disable-next-line
  console.error("Reason:", reason);
});
