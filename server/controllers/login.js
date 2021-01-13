const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userBUS = require("../models/user");
const { STATUS } = require("../utils/constant");
const { responseWithData } = require("../utils/utils");
const config = require("../config/config.json")

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.GG_CLIENT_ID);
async function verify(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.GG_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  }
  catch (err) {
    return false;
  }
}

module.exports = {
  login: (role) => async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await userBUS.findByUsername(username);
      if (!user || (role && user.role != role)) {
        throw "Invalid Username";
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
          res.cookie("jwt", token);
          responseWithData(res, { token });
        } else {
          throw "Invalid password";
        }
      }
    } catch (err) {
      console.trace(err);
      res.json({
        code: STATUS.UNAUTHORIZE.code,
        data: { message: err.message || err },
      });
    }
  },
  loginGoogle: async (req, res) => {
    const { token } = req.body;
    const payload = await verify(token);
    if (!payload)
      throw STATUS.UNAUTHORIZE;
    try {
      const { email, sub: gg_uid, name } = payload;
      const uid = await userBUS.findOrCreate(gg_uid, email, name);
      const info = {
        id: uid,
        username: email,
      };
      const token = jwt.sign(info, process.env.JWT_SECRET_KEY);
      res.cookie("jwt", token);
      responseWithData(res, { token });
    } catch (err) {
      console.trace(err);
      res.json({
        code: STATUS.UNAUTHORIZE.code,
        data: { message: err.message || err },
      });
    }
  }
};
