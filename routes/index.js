const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  findUserById,
  editUserData,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/users");

router.route("/").get((req, res) => {
  res.send("The API is working fine.");
});

router.route("/users").get(getAllUsers).post(createUser).delete(deleteAllUsers);
router
  .route("/users/:id")
  .get(findUserById)
  .patch(editUserData)
  .delete(deleteUser);
module.exports = router;
