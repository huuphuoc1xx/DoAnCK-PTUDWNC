const db = require('../utils/db');

const startGame = ({ username_x }) => {
  const entity = {
    player_x: username_x,
    player_o: null,
    detail: null,
    result: null
  }
  return db.add('game', entity).then(res => res.insertId);
}
const updateGame = (entity, id) => db.edit('game', entity, { id });
const getGame = (room) => db.load(`SELECT detail FROM game WHERE id =?`, [room]).then(res => res[0]);
const updateUserPlay = (fieldChange, data, id) => {
  const entity = {}
  entity[fieldChange] = data;
  return db.edit('game', entity, { id: id });
}

const filterGame = ({ id, player_o, player_x, last_id, page_size }) => {
  const condition = ["TRUE"];
  const params = [];
  const filterFields = { id, player_o, player_x }
  Object.keys(filterFields).filter(item => filterFields[item]).forEach(item => {
    condition.push(`${item} = ?`);
    params.push(filterFields[item]);
  });

  if (last_id > 0) {
    condition.push("id < ?");
    params.push(last_id);
  }
  return db.load(
    `SELECT id, player_x, player_o, IF(result="X",player_x, IF(result="O",player_o, NULL)) winner FROM game
      WHERE ${condition.join(" AND ")} 
      ORDER BY id DESC 
      LIMIT ${Math.max(+page_size || 0, 10)}`, params);
}
module.exports = {
  startGame,
  updateGame,
  getGame,
  updateUserPlay,
  filterGame
}