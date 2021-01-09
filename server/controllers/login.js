const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userBUS = require("../bus/user");
const { STATUS } = require("../utils/constant");
const { responseWithStatus, responseWithData } = require("../utils/utils");

module.exports = {
  post: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await userBUS.findByUsername(username);
      if (!user) {
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
        data: { message: err.message },
      });
    }
  },
};
