const express = require('express');

const controller = require('../controllers/user');
const authentication = require('../services/authentication');

const router = express.Router();
router.get('/profile', authentication.ensureAuthenticated(), controller.getById);

module.exports = router;