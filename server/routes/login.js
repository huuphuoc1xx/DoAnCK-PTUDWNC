const express = require('express');

const controller = require('../controllers/login');

const router = express.Router();

router.post('/', controller.login());
router.post('/google', controller.loginGoogle);

module.exports = router;