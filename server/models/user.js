const db = require("../utils/db");
const utils = require("../utils/utils");

const TABLE = "users";
const changeFields = ["id", "username", "password", "name", "role"];

const { add, edit, findAll, findByCondition } = utils.commonModel(db, TABLE, changeFields, changeFields);
const findByUsername = (username) => findByCondition({ username }).then(res => res[0]);

module.exports = {
  add,
  edit,
  findAll,
  findByCondition,
  findByUsername
};
