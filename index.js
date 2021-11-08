const express = require("express");
const app = express();
const port = 3000;

// Connect to database
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) throw err;
});

// Middleware
app.use(express.json());

// Routes
const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
  console.log(`Backend application is listening at http://localhost:${port}/`);
});
