const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  data: [String],
});

userSchema.statics.getNewId = async function () {
  const numOfUsers = await this.find({}).count();
  if (numOfUsers === 0) return 1;
  let highestId = await this.find({}).sort({ _id: "descending" }).limit(1);
  highestId = highestId[0].id;
  return parseInt(highestId) + 1;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
