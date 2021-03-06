const { STATUS } = require("./constant");
const utils = require("./utils")


module.exports = {
  handleReadRequest: async ({ req, res, sourceInput, fields, readFunc, resource }) => {
    let obj = {};
    if (sourceInput) obj = utils.dataMapper(req[sourceInput], fields || []);

    try {
      const info = await readFunc(obj);
      const data = {};
      data[resource] = info;
      utils.responseWithData(res, data)
    } catch (error) {
      console.error(error);
      if (typeof error === "number")
        utils.responseWithStatus(res, error)
      else
        utils.responseWithStatus(res, "INTERNAL");
    }
  },
  handleWriteRequest: async ({ req, res, sourceInput, fields, io, resource }) => {
    let obj = {};
    if (sourceInput) obj = utils.dataMapper(req[sourceInput], fields);

    try {
      const result = await io(obj);
      if (result.affectedRows) {
        //create data to response
        const data = {};
        data[resource] = req.body;
        if (result.insertId)
          data[resource][fields[0]] = result.insertId;
        utils.responseWithData(res, data);
      } else
        utils.responseWithStatus(res, "UNCHANGE");
    } catch (error) {
      console.error(error);
      if (typeof error === "number")
        utils.responseWithStatus(res, error)
      else
        utils.responseWithStatus(res, "INTERNAL");
    }
  },
}