const User = require("../models/User");

async function getAllUsers(req, res) {
  const users = await User.find({});
  return res.json({ msg: "Successfully retrieved users", data: users });
}

async function deleteAllUsers(req, res) {
  const deletedUsers = await User.deleteMany({});
  return res.json({
    msg: "Successfully deleted all users",
    data: deletedUsers,
  });
}

async function getNewId() {
  const numOfUsers = await User.find({}).count();
  if (numOfUsers === 0) return 1;
  let highestId = await User.find({}).sort({ _id: "descending" }).limit(1);
  highestId = highestId[0].id;
  return parseInt(highestId) + 1;
}

async function createUser(req, res) {
  const { username, password } = req.body;
  const userExists = await User.exists({ username: username });
  if (userExists) {
    return res.json({
      msg: `Failed to create user. User already exists with username "${username}"`,
    });
  }
  const newId = await getNewId();
  const newUser = new User({
    _id: newId,
    username: username,
    password: password,
  });
  await newUser.save();
  return res.json({ msg: "Successfully created user", data: newUser });
}

async function findUser(req, res) {
  const { username, password } = req.body;
  const user = await User.find({ username: username, password: password });
  if (!user) {
    return res.json({
      msg: `Failed to find user with username "${username}" and password "${password}"`,
    });
  }
  return res.json({ msg: "Successfully found user", data: user });
}

async function findUserById(req, res) {
  const id = parseInt(req.params.id);
  const user = await User.findById(id);
  if (!user) {
    return res.json({ msg: `Failed to find user with id "${id}"` });
  }
  return res.json({ msg: "Successfully found user", data: user });
}

async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.json({ msg: `User with id "${id}" does not exist` });
  }
  return res.json({ msg: `Successfully deleted user with id "${id}"` });
}

async function getUserData(req, res) {
  const id = parseInt(req.params.id);
  const user = await User.findById(id);
  if (!user) {
    return res.json({ msg: `Failed to find user with id "${id}"` });
  }
  return res.json({ msg: "Successfully returned user data", data: user.data });
}

async function editUserData(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  if (data["_id"]) delete data["_id"];
  const userExists = await User.exists({ _id: id });
  if (!userExists) {
    return res.json({ msg: `Failed to find user with id "${id}"` });
  }
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
  return res.json({
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
