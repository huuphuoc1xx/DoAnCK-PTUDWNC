const express = require('express');
const controller = require('../../controllers/login');
const { ensureAuthenticated } = require('../../services/authentication');
const router = express.Router();

router.post('/', controller.login("ADMIN"));
router.get('/validate', ensureAuthenticated("ADMIN"), (req, res) => {res.json({ code: 0, data: { user: req.user } }) });

module.exports = router;