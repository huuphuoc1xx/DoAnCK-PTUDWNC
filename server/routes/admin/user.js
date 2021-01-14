const express = require('express');
const router = express.Router();
const { filter, updateUser } = require("../../controllers/user")

router.get('/', filter);
router.put('/', updateUser);

module.exports = router;