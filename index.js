const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
const routes = require("./routes");
app.use("/api/v1/", routes);

app.listen(port, () => {
  console.log(`Backend application is listening at http://localhost:${port}/`);
});
