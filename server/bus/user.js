const db = require("../utils/db");
const utils = require("../utils/utils");

const TABLE = "users";
const viewFields = ["id","username","name"];
const changeFields = ["id","username","name"];

module.exports = {
  ...utils.commonModel(db, TABLE, viewFields, changeFields),
  findByUsername: function (username) {
    this.findByCondition({ username: username });
  },
};
