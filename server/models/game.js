const { use } = require('passport');
const { updateStatus } = require('../socket/manager');
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
    `SELECT id, player_x, player_o, IF(result="X",player_x, IF(result="O",player_o, NULL)) winner, detail FROM game
      WHERE ${condition.join(" AND ")} 
      ORDER BY id DESC 
      LIMIT ${Math.max(+page_size || 0, 10)}`, params);
}
const getListMess = (room) => db.load(`SELECT message FROM game WHERE id =?`, [room]).then(res => res[0] && res[0].message);
const getInfor = (id) => db.load(`SELECT cup, win, lose FROM users WHERE id =?`, [id]).then(res => res[0]);
const updateCup = (id, cup) => db.edit('users',{cup:cup},{id:id});
const updateLose = (id, lose) => db.edit('users', {lose: lose}, {id: id});
const updateWin = (id, win) => db.edit('users', {win:win}, {id:id});

module.exports = {
  startGame,
  updateGame,
  getGame,
  updateUserPlay,
  filterGame,
  getListMess,
  getInfor,
  updateCup,
  updateLose,
  updateWin
}