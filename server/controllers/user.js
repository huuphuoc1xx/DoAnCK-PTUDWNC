const userBUS = require('../models/user');
const { handleReadRequest } = require('../utils/handleRequest');

module.exports = {
  getById: function (req, res, next) {
    res.json({ code: 0, data: { user: req.user } })
  },
  filter: function (req, res, next){
    handleReadRequest({
      req, res,
      readFunc: userBUS.filterUser,
      sourceInput:"query",
      fields:["id","last_id","page_size"],
      resource:"users"
    })
  }
};