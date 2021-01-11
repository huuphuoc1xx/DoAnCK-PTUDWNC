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
module.exports = {
    startGame,
    updateGame,
    getGame,
    updateUserPlay

}