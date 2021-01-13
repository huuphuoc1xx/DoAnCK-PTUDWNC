const passport = require("passport");
const passportStrategy = require("../config/passport");
const manager = require("./manager");
const { startGame, updateGame, getGame, updateUserPlay } = require('../models/game');
passportStrategy(passport);

module.exports = (server) => {
  const socket = require("socket.io");
  const io = socket(server, {
    path: "/socket",
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      optionsSuccessStatus: 200,
    },
  });
  io.use((socket, next) => {
    passport.authenticate("jwt", (err, user) => {
      if (!err && user) {
        socket.request.user = user;
        next();
      }
    })(socket.handshake, {}, next);
  });

  io.on("connection", (socket) => {
    const user = socket.request.user;
    manager.addUser(user, socket.id);
    socket.on("USER_JOIN_SOCKET", ({ user }) => {
      io.emit("UPDATE_LIST_USER", manager.getListOnline());
    });
    //lúc mới bắt đầu
    socket.on("START_GAME", async () => {
      const room = await startGame({ username_x: user.id });
      manager.addRoom(room, user, socket.id);
      socket.room = room;
      socket.join(room);
      io.to(socket.room).emit("USER_PLAY_GAME", { list: [user], room: room });
      io.to(socket.room).emit("USER_JOIN_GAME", [user]);
    });
    socket.on("JOIN_GAME", async (room) => {
      room = parseInt(room);
      manager.addRoomExits(room, user, socket.id);
      socket.room = room;
      socket.join(room);
      socket.emit("USER_PLAY_GAME", {
        list: manager.getUserPlay(room),
        room: room,
      });
      io.to(socket.room).emit("USER_JOIN_GAME", manager.getRoomByOne(room));
    });
    socket.on("START_PLAY", async (room) => {
      if (manager.addPlayer(room, user, socket.id)) {
        const result = updateUserPlay("player_o", user.id, room);
        io.to(socket.room).emit("USER_PLAY_GAME", { list: [user], room: room });
      }
    });
    socket.on("PLAY_CHESS", async (data) => {
      let squares = await getGame(data.room);
      squares = squares.detail || "{}";
      squares = JSON.parse(squares);
      const exist = Object.values(squares).find((value) => value == data.chess);
      if (exist == undefined) {
        const checkCurState = manager.checkCurState(
          data.room,
          data.chess,
          user
        );
        const count = Object.keys(squares).length;
        if (checkCurState) {
          io.to(socket.room).emit("GET_PLAY_CHESS", {
            chess: data.chess,
            value: checkCurState % 2 ? "O" : "X",
          });
          const winner = checkWin(
            squares,
            data.chess,
            checkCurState % 2 ? "O" : "X"
          );
          squares[count] = data.chess;
          const update = {
            detail: JSON.stringify(squares),
            result: winner ? (checkCurState % 2 ? "O" : "X") : null,
          };
          await updateGame(update, socket.room);
          if (winner != null) {
            io.to(socket.room).emit("WIN_GAME", { username: user.username, list: winner });
            manager.updateStatus(data.room);
          }
        }
      }
    });
    socket.on("GET_NEW_CHESSBOARD", async () => {
      const result = manager.getRoom();
      socket.emit("GET_NEW_CHESSBOARD", result);
    });
  });
};

const checkWin = (squaresObject, chess, type) => {
  const squares = {};
  Object.keys(squaresObject).forEach((key) => {
    const x = parseInt(squaresObject[key] / 20), y = squaresObject[key] % 20;
    squares[x] = squares[x] || {};
    squares[x][y] = Number(key) % 2 ? 'O' : 'X';
  });
  const curPos = { x: chess / 20, y: chess % 20 };
  const args = [squares, curPos, type];
  return checkRow(...args) || checkCol(...args) || checkDiag(...args) || checkSubDiag(...args);
};
const checkRow = (square, curPos, type) => {
  const maxX = Math.min(19, curPos.x + 4);
  const minX = Math.max(0, curPos.x - 4);
  let list = [curPos];
  for (let x0 = curPos.x - 1; x0 >= minX; x0--) {
    if (!square[x0] || square[x0][curPos.y] != type)
      break;
    list = [{ x: x0, y: curPos.y }, ...list];
  }
  if (list.length == 5)
    return list;
  for (let x0 = curPos.x + 1; x0 <= maxX; x0++) {
    if (!square[x0] || square[x0][curPos.y] != type)
      break;
    list.push({ x: x0, y: curPos.y });
    if (list.length == 5)
      break;
  }
  return list.length == 5 ? list : null;
};
const checkCol = (square, curPos, type) => {
  const maxY = Math.min(19, curPos.y + 4);
  const minY = Math.max(0, curPos.y - 4);
  let list = [curPos];
  for (let y0 = curPos.y - 1; y0 >= minY; y0--) {
    if (!square[curPos.x] || square[curPos.x][y0] != type)
      break;
    list = [{ x: x0, y: curPos.x }, ...list];
  }
  if (list.length == 5)
    return list;

  for (let y0 = curPos.y + 1; y0 <= maxY; y0++) {
    if (!square[curPos.x] || square[curPos.x][y0] != type)
      break;
    list.push({ x: x0, y: curPos.x });
    if (list.length == 5)
      break;
  }
  return list.length == 5 ? list : null;
};
const checkDiag = (square, curPos, type) => {
  const maxX = Math.min(19, curPos.x + 4);
  const maxY = Math.min(19, curPos.y + 4);
  const minX = Math.max(0, curPos.x - 4);
  const minY = Math.max(0, curPos.y - 4);
  let list = [curPos];
  for (let x0 = curPos.x - 1, y0 = curPos.y - 1; y0 >= minY, x0 >= minX; y0--, x0--) {
    if (!square[x0] || square[x0][y0] != type)
      break;
    list = [{ x: x0, y: y0 }, ...list];
  }
  if (list.length == 5)
    return list;

  for (let x0 = curPos.x + 1, y0 = curPos.y + 1; y0 <= maxY, x0 <= maxX; y0++, x0++) {
    if (!square[x0] || square[x0][y0] != type)
      break;
    list.push({ x: x0, y: y0 });
    if (list.length == 5)
      break;
  }
  return list.length == 5 ? list : null;
};
const checkSubDiag = (square, curPos, type) => {
  const maxX = Math.min(19, curPos.x + 4);
  const maxY = Math.min(19, curPos.y + 4);
  const minX = Math.max(0, curPos.x - 4);
  const minY = Math.max(0, curPos.y - 4);
  let list = [curPos];
  for (let x0 = curPos.x - 1, y0 = curPos.y + 1; y0 >= minY, x0 <= maxX; y0--, x0++) {
    if (!square[x0] || square[x0][y0] != type)
      break;
    list = [{ x: x0, y: y0 }, ...list];
  }
  if (list.length == 5)
    return list;
  for (let x0 = curPos.x + 1, y0 = curPos.y - 1; y0 <= maxY, x0 >= minX; y0--, x0++) {
    if (!square[x0] || square[x0][y0] != type)
      break;
    list.push({ x: x0, y: y0 });
    if (list.length == 5)
      break;
  }
  return list.length == 5 ? list : null;
};
