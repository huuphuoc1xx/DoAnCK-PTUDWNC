const userBUS = require('../models/user');
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
    res.json({ code: 0, data: { user: req.user } })
  }
};