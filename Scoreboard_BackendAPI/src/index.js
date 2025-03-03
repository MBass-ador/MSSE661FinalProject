// imports
import express from "express";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";

//const scoreboardRoutes = require("./routes/scoreboard.routes");
//const memberRoutes =     require("./routes/member.routes");

import authRoutes from "./routes/auth.routes.js";
//import userRoutes from "./routes/user.routes";

import { 
        error404, 
        error500 } from "./middleware/errors.middleware.js";

// set up app,  default port: 3000,  logLevel: dev
const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";
const env = process.env.NODE_ENV;

// log server requests : If not in test environment.
if (env !== "test") {
  app.use(logger(logLevel));
}

// parse requests  https:github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json() );

// facilitate cross origin requests 
// Allow requests from any origin for development purposes (postman)
app.use(cors());

/*              More restrictive CORS policy for production (v1.0)
app.use(cors({
  origin: 'http://localhost:4000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));*/

// routes           (future paths commented out for developemnt)

//app.use('/api/scoreboard', scoreboardRoutes); // http://localhost:3000/api/scoreboard
//app.use('/api/members', memberRoutes);       // http://localhost:3000/api/members
//app.use('/api/users', userRoutes);          // http://localhost:3000/api/user
app.use('/api/auth', authRoutes);          // http://localhost:3000/api/auth


// handle errors via middleware
app.use(error404);
app.use(error500);

// listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});