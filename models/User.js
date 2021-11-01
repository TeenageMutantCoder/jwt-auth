const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  data: [String],
});

const userModel = mongoose.Model("User", userSchema);

module.exports = userModel;
