const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

async function getAllUsers(req, res) {
  const users = await User.find({});
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully retrieved users", data: users });
}

async function deleteAllUsers(req, res) {
  const deletedUsers = await User.deleteMany({});
  return res.status(StatusCodes.OK).json({
    msg: "Successfully deleted all users",
    data: deletedUsers,
  });
}

async function createUser(req, res) {
  const { email, password } = req.body;
  const userExists = await User.exists({ email });
  if (userExists) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: `Failed to create user. User already exists with email "${email}"`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "Successfully created user", data: newUser });
}

async function findUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: `Invalid email. There is no user with email "${email}"`,
    });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: `Invalid password. There is no user with email "${email}" and password "${password}"`,
    });
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully found user", data: user });
}

async function findUserById(req, res) {
  const { id } = req.params;
  if (id.length !== 24) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Invalid ID. ID must be 24 characters.` });
  }
  const user = await User.findById(id);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Failed to find user with id "${id}"` });
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully found user", data: user });
}

async function deleteUser(req, res) {
  const { id } = req.params;
  if (id.length !== 24) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Invalid ID. ID must be 24 characters.` });
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `User with id "${id}" does not exist` });
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: `Successfully deleted user with id "${id}"` });
}

async function editUser(req, res) {
  const { id } = req.params;
  if (id.length !== 24) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Invalid ID. ID must be 24 characters.` });
  }
  const data = req.body;
  if (data["_id"]) delete data["_id"];
  const userExists = await User.exists({ _id: id });
  if (!userExists) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Failed to find user with id "${id}"` });
  }
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated user with id "${id}"`,
    data: updatedUser,
  });
}

async function getUserExpenses(req, res) {
  const { id } = req.params;
  if (id.length !== 24) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Invalid ID. ID must be 24 characters.` });
  }
  const user = await User.findById(id);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Failed to find user with id "${id}"` });
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully returned user data", data: user.expenses });
}

module.exports = {
  getAllUsers,
  deleteAllUsers,
  createUser,
  findUser,
  findUserById,
  deleteUser,
  editUser,
  getUserExpenses,
};
