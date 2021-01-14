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
async function updateGame ( entity, id) {
    const result = await db.edit('game',entity, {id:id});
}
const getGame = async (room) => {
    return await db.load(`SELECT detail FROM game WHERE id =?`,[room]);
}
async function updateUserPlay (fieldChange, data, id) {
    const entity = {}
    entity[fieldChange] = data;
    const result = await db.edit('game',entity, {id:id});
}
module.exports = {
    startGame,
    updateGame,
    getGame,
    updateUserPlay

}