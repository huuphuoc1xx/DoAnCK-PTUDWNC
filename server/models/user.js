const db = require("../utils/db");
const utils = require("../utils/utils");

const TABLE = "users";
const changeFields = ["id", "username", "password", "name", "role"];

const { add, edit, findByCondition } = utils.commonModel(db, TABLE, changeFields, changeFields);
const findByUsername = (username) => findByCondition({ username }).then(res => res[0]);

const filterUser = ({ id, name, email, last_id, page_size }) => {
  const condition = ["TRUE"];
  const params = [];
  const filterFields = { id, name, email }
  Object.keys(filterFields).filter(item => filterFields[item]).forEach(item => {
    condition.push(`${item} = ?`);
    params.push(filterFields[item]);
  });

  if (last_id > 0) {
    condition.push("id < ?");
    params.push(last_id);
  }
  return db.load(
    `SELECT ${changeFields} FROM ${TABLE} 
    WHERE ${condition.join(" AND ")} 
    ORDER BY id DESC 
    LIMIT ${Math.max(+page_size || 0, 10)}`, params).then(res => res.map(user => { delete user.password; return user; }));
}
module.exports = {
  add,
  edit,
  findByCondition,
  findByUsername,
  filterUser
};
