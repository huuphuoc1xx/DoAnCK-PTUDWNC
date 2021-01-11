const { ensureAuthenticated } = require("../../services/authentication");

const router = require("express").Router();

router.use("/login", require("./login"));
router.use(ensureAuthenticated("ADMIN"));

module.exports = router;