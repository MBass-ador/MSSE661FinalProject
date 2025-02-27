// imports
const express = require("express");
const cors =    require("cors");
const logger =  require("morgan");
const bodyParser = require("body-parser");

const scoreboardRoutes = require("./routes/scoreboard.routes");
const memberRoutes =     require("./routes/member.routes");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const {
    error404,
    error500
} = require("./middleware/errors.middleware");

// set up app,  default port: 3000,  logLevel: dev
const app = express();
port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";
const env = process.env.NODE_ENV;

// log server requests : If not in test environment.
if (env !== "test") {
  app.use(logger(logLevel));
}

// parse requests  https:github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// facilitate cross origin requests
app.use(cors());

// routes
app.use('/api/scoreboard', scoreboardRoutes); // http://localhost:3000/api/scoreboard
app.use('/api/members', memberRoutes);       // http://localhost:3000/api/members
app.use('/api/users', userRoutes);          // http://localhost:3000/api/user
app.use('/api/auth', authRoutes);          // http://localhost:3000/api/auth


// handle errors via middleware
app.use(error404);
app.use(error500);

// listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});