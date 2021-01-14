const express = require('express');

const controller = require('../controllers/update-profile');
const authentication = require('../services/authentication');

const router = express.Router();

router.put('/:id', authentication.ensureAuthenticated(), controller.put);

module.exports = router;