const passport = require('passport');
const passportStrategy = require('../config/passport');
const { STATUS } = require('../utils/constant');
const { responseWithStatus } = require('../utils/utils');
passportStrategy(passport);

const ensureAuthenticated = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (err || !user) {
      responseWithStatus(res, "UNAUTHORIZE");
    } else {
      req.user=user;
      next();
    }
  })(req, res, next);
};

const forwardAuthenticated = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (!user) {
      next();
    } else {
      res.redirect("/");
    }
  })(req, res, next);
};

module.exports = {
  ensureAuthenticated,
  forwardAuthenticated
};