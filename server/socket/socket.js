const passport = require("passport");
const passportStrategy = require("../config/passport");
const manager = require("./manager");
const { startGame, updateGame } = require('./useDatabse');
passportStrategy(passport);
const cors = require("cors");
const { authenticate } = require("passport");

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
    socket.on('USER_JOIN_SOCKET', ({ user }) => {
      io.emit("UPDATE_LIST_USER", manager.getListOnline())
    });
    socket.on('START_GAME', async () => {
      const room = await startGame({ username_x: user.id });
      manager.addRoom(room, user, socket.id);
      socket.room = room;
      socket.join(room);
      io.to(socket.room).emit('USER_PLAY_GAME', [user]);
      io.to(socket.room).emit('USER_JOIN_GAME', [user]);
    });
    socket.on('JOIN_GAME', async (room) => {
      room = parseInt(room);
      manager.addRoomExits(room, user, socket.id);
      socket.room = room;
      socket.join(room);
      socket.emit('USER_PLAY_GAME', manager.getUserPlay(room));
      io.to(socket.room).emit('USER_JOIN_GAME', manager.getRoomByOne(room));
    });
    socket.on('START_PLAY', async () => {
      const room = manager.addPlayer(user, socket.id);
      const result = updateGame('player_o', user_id, room);
      const data = { squares: Array(20 * 20).fill(null), play: 'x' }
      io.to(socket.room).emit('GET_PLAY_CHESS', data);
    })
    socket.on('PLAY_CHESS', async ({ squares, play, i }) => {
      const squares_cur = squares;
      squares_cur[i] = play == 'x' ? 'X' : 'O';
      const data = {
        squares: squares_cur,
        play: play == 'x' ? 'o' : 'x'
      };
      let result = await updateGame('detail', JSON.stringify(squares_cur), socket.room);
      if (checkWiner(squares_cur)) {
        result = await updateGame('result', play, socket.room);
        io.to(socket.room).emit('WIN_GAME', { user_win: play });
      }
      io.to(socket.room).emit('GET_PLAY_CHESS', data);
    });
    socket.on('GET_NEW_CHESSBOARD', async () => {
      const result = manager.getRoom();
      socket.emit('GET_NEW_CHESSBOARD', result);
    })
  });
}
const checkWiner = (squares) => {
  const row = 20;
  for (let i = 0; i < row; i++)
    for (let j = 0; j < row - 2; j++) {
      if (squares[row * i + j] && squares[row * i + j] === squares[row * i + j + 1] && squares[row * i + j] === squares[row * i + j + 2])

        return {
          square: squares[row * i + j],
          a: row * i + j,
          b: row * i + j + 1,
          c: row * i + j + 2
        }
    }
  for (let i = 0; i < row; i++)
    for (let j = 0; j < row - 2; j++) {
      if (squares[row * j + i] && squares[row * j + i] === squares[row * (1 + j) + i] && squares[row * j + i] === squares[row * (2 + j) + i])
        return {
          square: squares[row * j + i],
          a: row * j + i,
          b: row * (j + 1) + i,
          c: row * (j + 2) + i
        }
    }
  for (let i = 0; i < row - 2; i++)
    for (let j = 0; j < row - 2; j++) {
      if (squares[row * j + i] && squares[row * j + i] === squares[row * (1 + j) + i + 1] && squares[row * j + i] === squares[row * (2 + j) + i + 2])
        return {
          square: squares[row * j + i],
          a: row * j + i,
          b: row * (j + 1) + i + 1,
          c: row * (j + 2) + i + 2
        }

    }
  for (let i = 0; i < row - 2; i++)
    for (let j = row - 1; j >= row - 2; j--) {
      if (squares[row * j + i] && squares[row * j + i] === squares[row * (j - 1) + i + 1] && squares[row * j + i] === squares[row * (j - 2) + i + 2])
        return {
          square: squares[row * j + i],
          a: row * j + i,
          b: row * (j - 1) + i + 1,
          c: row * (j - 2) + i + 2
        }
    }

  return null
}
