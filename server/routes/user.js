const express = require('express');

const controller = require('../controllers/user');
const authentication = require('../services/authentication');

const router = express.Router();

router.get('/', authentication.ensureAuthenticated(), controller.getAll);

router.get('/profile', authentication.ensureAuthenticated(), controller.getById);

module.exports = router;