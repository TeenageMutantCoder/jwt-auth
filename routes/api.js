const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  findUserById,
  editUser,
  deleteUser,
  deleteAllUsers,
  getUserExpenses,
  deleteUserExpenses,
  addUserExpense,
  getUserExpense,
  deleteUserExpense,
  editUserExpense,
} = require("../controllers/users");

router.route("/").get((req, res) => {
  res.send("The API is working fine.");
});

router.route("/users").get(getAllUsers).post(createUser).delete(deleteAllUsers);
router.route("/users/:id").get(findUserById).patch(editUser).delete(deleteUser);
router
  .route("/users/:id/expenses")
  .get(getUserExpenses)
  .post(addUserExpense)
  .delete(deleteUserExpenses);
router
  .route("/users/:userId/expenses/:expenseId")
  .get(getUserExpense)
  .patch(editUserExpense)
  .delete(deleteUserExpense);

module.exports = router;
