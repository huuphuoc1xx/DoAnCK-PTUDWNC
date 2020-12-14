const userBUS = require('../bus/user');
const { handleReadRequest } = require('../utils/handleRequest');

module.exports = {
  getAll: function (req, res, next) {
    handleReadRequest({
      req, res,
      readFunc: userBUS.findAll,
      resource: "users"
    })
  },
  getById: function (req, res, next) {
    handleReadRequest({
      req, res, sourceInput: "user",
      fields: ["id"],
      readFunc: userBUS.findByCondition,
      resource: "user"
    })
  }
};