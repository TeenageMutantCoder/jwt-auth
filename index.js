require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
require("express-async-errors");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = Number(process.env.PORT) || 3000;

// Connect to database
const connect = require("./db/connect");
connect(process.env.MONGO_URI);

// Middleware
const loggerType = process.env.IS_PROD === "true" ? "combined" : "dev";
app.use(morgan(loggerType));
app.use(express.json());
app.use(passport.initialize());

// Routes
const routes = require("./routes");
app.use(routes);

// Custom Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend application is listening at http://localhost:${port}/`);
});
