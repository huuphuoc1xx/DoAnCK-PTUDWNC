const { filterGame, getGameByUserId } = require("../models/game");
const { handleReadRequest } = require("../utils/handleRequest")

module.exports = {
  getGame: (req, res) => {
    handleReadRequest({
      req, res, fields: ["id", "player_x", "player_o", "last_id", "page_size"],
      sourceInput: "query",
      readFunc: filterGame,
      resource: "games"
    });
  },
  getGameById: (req, res) => {
    handleReadRequest({
      req,res, fields: ['id'],
      sourceInput: "user",
      readFunc: getGameByUserId,
      resource: "games"
    })
  }
}