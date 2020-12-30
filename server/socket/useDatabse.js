const db = require('../utils/db');

async function startGame({ username_x }) {
    const entity = {
        player_x: username_x,
        player_o: null,
        detail: null,
        result: null
    }
    const result = await db.add('game',entity);
    return result.insertId;
}
async function updateGame (fieldChange, data, id) {
    const entity = {}
    entity[fieldChange] = data;
    const result = await db.edit('game',entity, {id:id});
}

module.exports = {
    startGame,
    updateGame

}