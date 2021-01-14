const userBUS = require('../models/user');
const { handleWriteRequest } = require('../utils/handleRequest');

module.exports = {
	put: function(req, res, next) {
    handleWriteRequest({
      req,res,
      sourceInput:"body",
      fields:["id","name"],
      io:userBUS.edit,
      resource:"users"
    })
	}
};