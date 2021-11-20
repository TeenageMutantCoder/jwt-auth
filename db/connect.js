const mongoose = require("mongoose");

function connect(url) {
  return mongoose.connect(url).then(
    () => {
      console.log(`Successfully connected to database at ${url}`);
    },
    (err) => {
      console.log("There was an error connecting to the database.");
      throw err;
    }
  );
}

module.exports = connect;
