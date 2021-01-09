const passportJwt = require('passport-jwt');

const userBUS = require('../bus/user');

const JwtStragegy = passportJwt.Strategy;

var cookieExtractor = function (req) {
  var token = null;
  if (req.cookies) token = req.cookies['jwt'];
  else if(req.query) token=req.query.token;
  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET_KEY
};
const jwtStragegy = new JwtStragegy(jwtOptions, function (payload, done) {
  userBUS.findByCondition({ id: payload.id })
    .then(function (user) {
      if (!user) {
        return done(new Error("User not found!"));
      } else {
        return done(null, user);
      }
    })
    .catch(function (err) {
      console.trace(err);
      return done(err);
    });
});

module.exports = function (passport) {
  passport.use(jwtStragegy);
};