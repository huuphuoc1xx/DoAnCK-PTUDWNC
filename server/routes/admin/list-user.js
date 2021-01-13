const express = require('express');
const router = express.Router();
const { filter } = require("../../controllers/user")

router.get('/', filter);

module.exports = router;