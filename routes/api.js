const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  findUserById,
  editUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/users");

router.route("/").get((req, res) => {
  res.send("The API is working fine.");
});

router.route("/users").get(getAllUsers).post(createUser).delete(deleteAllUsers);
router.route("/users/:id").get(findUserById).patch(editUser).delete(deleteUser);

module.exports = router;
