const router = require("express").Router();

const { findUser, createUser } = require("../controllers/users");

router.route("/login").post(findUser);
router.route("/register").post(createUser);
const apiRoutes = require("./api");
router.use("/api/v1/", apiRoutes);

module.exports = router;
