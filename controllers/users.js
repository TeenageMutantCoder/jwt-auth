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
  const { username, password } = req.body;
  const userExists = await User.exists({ username: username });
  if (userExists) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: `Failed to create user. User already exists with username "${username}"`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newId = await User.getNewId();
  const newUser = new User({
    _id: newId,
    username: username,
    password: hashedPassword,
  });
  await newUser.save();
  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "Successfully created user", data: newUser });
}

async function findUser(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: `Invalid username. There is no user with username "${username}"`,
    });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: `Invalid password. There is no user with username "${username}" and password "${password}"`,
    });
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully found user", data: user });
}

async function findUserById(req, res) {
  const id = parseInt(req.params.id);
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
  const id = parseInt(req.params.id);
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

async function getUserData(req, res) {
  const id = parseInt(req.params.id);
  const user = await User.findById(id);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Failed to find user with id "${id}"` });
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully returned user data", data: user.data });
}

async function editUserData(req, res) {
  const id = parseInt(req.params.id);
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

module.exports = {
  getAllUsers,
  createUser,
  findUser,
  findUserById,
  deleteUser,
  getUserData,
  editUserData,
  deleteAllUsers,
};
