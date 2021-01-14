const express = require('express');
const { getRankUser } = require('../controllers/game');
const router = express.Router();
const authentication = require('../services/authentication');
router.get('/', authentication.ensureAuthenticated(), getRankUser);

module.exports = router;