const express = require('express');

const controller = require('../controllers/register');
const authentication = require('../services/authentication');

const router = express.Router();

router.post('/', controller.post);

module.exports = router;