const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
// Routes
const accountRoute = require("./routes/account.route");
const boardRoute = require("./routes/board.route");
const locationRoute = require("./routes/location.route");

// Express server
const app = express();

// Activate utilities
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(compression());

// Define Default Path
app.get("/", (req, res) => {
  res.send("> API running..");
});
app.use("/accounts", accountRoute);
app.use("/board", boardRoute);
app.use("/location", locationRoute);

// posts api requests

// boards api requests

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  res.send("Not found");
});

// Export Express router
module.exports = app;
