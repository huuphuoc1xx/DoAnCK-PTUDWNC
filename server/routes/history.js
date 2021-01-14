const express = require('express');
const { getGameById } = require('../controllers/game');
const router = express.Router();
const authentication = require('../services/authentication');
router.get('/', authentication.ensureAuthenticated(), getGameById);

module.exports = router;