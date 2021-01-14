const passport = require('passport');
const passportStrategy = require('../config/passport');
const { STATUS } = require('../utils/constant');
const { responseWithStatus } = require('../utils/utils');
passportStrategy(passport);

const ensureAuthenticated = (role) => function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (err || !user || (role && user.role != role)) {
      responseWithStatus(res, "UNAUTHORIZE");
    } else {
      if (user.status == "block")
        throw STATUS.BLOCK_USER;
      delete user.password;
      delete user.status;
      req.user = user;
      next();
    }
  })(req, res, next);
};


module.exports = {
  ensureAuthenticated
};