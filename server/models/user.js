const db = require("../utils/db");
const utils = require("../utils/utils");

const TABLE = "users";
const viewFields = ["id", "username", "password", "name", "email", "role", "status"]
const changeFields = ["id", "username", "password", "name", "role", "email", "gg_uid", "status"];

const { add, edit, findByCondition } = utils.commonModel(db, TABLE, viewFields, changeFields);
const findByUsername = (username) => findByCondition({ username }).then(res => res[0]);
const findOrCreate = async (gg_uid, email, name) => {
  const user = await findByCondition({ gg_uid }).then(res => res[0]);
  if (user) return user.id;
  return add({ username: email, email, name, gg_uid }).then(res => res.insertId);
};

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
  filterUser,
  findOrCreate
};
