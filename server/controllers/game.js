const { filterGame } = require("../models/game");
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
}