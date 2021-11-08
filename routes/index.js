const router = require("express").Router();

const { findUser, createUser } = require("../controllers/users");

router.route("/login").get().post(findUser);
router.route("/register").get().post(createUser);
const apiRoutes = require("./api");
router.use("/api/v1/", apiRoutes);

module.exports = router;
