const { ensureAuthenticated } = require("../../services/authentication");

const router = require("express").Router();

router.use("/login", require("./login"));
router.use(ensureAuthenticated("ADMIN"));
router.use("/history", require("./history"));

module.exports = router;