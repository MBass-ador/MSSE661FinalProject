/*  Developed by Matthew Bass
    Project = "Guild Score Board"
    for MSSE 661 Web Software Development
    Final Project
    Regis University
*/

// imports
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const scoreboardRoutes = require("./routes/scoreboard.routes");
const middleware = require("./middleware/errors.middleware");


// set up app  port: 3000  logLevel: dev
const app = express();
port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";

// log server requests
app.use(logger(logLevel));

// parse requests  https:github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes http://localhost:3000/testing
app.use('scoreboard', scoreboardRoutes);

// handle errors via middleware
app.use(middleware.error404);
app.use(middleware.error500);

// listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});