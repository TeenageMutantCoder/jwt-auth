const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("The API is working fine.");
});

module.exports = router;
