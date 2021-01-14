const express = require('express');
const { getGame } = require('../../controllers/game');
const router = express.Router();

router.get('/', getGame);

module.exports = router;