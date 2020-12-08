const bcrypt = require('bcryptjs');

const userBUS = require('../bus/user');
const { STATUS } = require('../utils/constant');
const { dataMapper, responseWithStatus } = require('../utils/utils');

module.exports = {
  post: async function (req, res, next) {
    try {
      const newUser = dataMapper(req.body, ["username", "name", "password"]);

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(newUser.password, salt)
      newUser.password = hash;

      const result = await userBUS.add(newUser)
      if (result.affectedRows) {
        //create data to response
        const payload = {
          id: result.insertId,
          username: newUser.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.cookie("jwt", token);
        responseWithStatus(res, STATUS.SUCCESS);
      } else throw "Register failed"
    }
    catch (err) {
      console.trace(err);
      res.json({ code: STATUS.UNAUTHORIZE.code, data: { message: err.message } });
    };

  }
};