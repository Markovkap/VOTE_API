require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require("cors");
const routes = require("./routes");
// const api = require("./api");
const app = express();

// Create servers
const server = http.createServer(app);

// Open MongoDB connection
// mongoose.Promise = Promise;

// mongoose.connect(process.env.MONGODB_URI, {
//   useMongoClient: true
//   // useNewUrlParser:true
// });
const client = new mongoose.MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect((err) => {
  const collection = client.db("Votes").collection("votes");
  // perform actions on the collection object
  client.close();
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

// Allow CORS

// app.use(cors());

app.use(express.static("./public"));

//set pug as default engine
app.set("view engine", "pug");

// Use routers
app.use("/", routes);
// app.use("/v1/api", api);

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
