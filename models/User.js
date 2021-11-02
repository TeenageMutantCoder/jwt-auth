const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  data: [String],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
