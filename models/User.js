const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
const emailValidator =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const expenseSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  cost: {
    type: Number,
    min: [0, "Cost must be greater than 0"],
    required: true,
  },
  date: { type: Date, required: true },
  tags: [String],
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    match: [emailValidator, "Must be a valid email"],
    required: true,
  },
  password: { type: String, required: true },
  token: String,
  expenses: [expenseSchema],
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { user_id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
