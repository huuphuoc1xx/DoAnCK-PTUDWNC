const db = require("../utils/db");
const utils = require("../utils/utils");

const TABLE = "users";
const viewFields = ["id", "username", "name"];
const changeFields = ["id", "username", "password", "name"];

module.exports = {
  ...utils.commonModel(db, TABLE, viewFields, changeFields),
  findByUsername: async function (username) {
    const result= await db.load(`SELECT ${changeFields} FROM ${TABLE} WHERE ?`,{ username: username });
    return result[0];
  },
};
