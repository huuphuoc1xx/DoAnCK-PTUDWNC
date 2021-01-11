const passport = require("passport");
const passportStrategy = require("../config/passport");
const manager = require("./manager");
const { startGame, updateGame, getGame, updateUserPlay } = require('../models/game');
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
    //lúc mới bắt đầu
    socket.on('START_GAME', async () => {
      const room = await startGame({ username_x: user.id });
      manager.addRoom(room, user, socket.id);
      socket.room = room;
      socket.join(room);
      io.to(socket.room).emit('USER_PLAY_GAME',{ list:[user], room: room });
      io.to(socket.room).emit('USER_JOIN_GAME', [user]);
    });
    socket.on('JOIN_GAME', async (room) => {
      room = parseInt(room);
      manager.addRoomExits(room, user, socket.id);
      socket.room = room;
      socket.join(room);
      socket.emit('USER_PLAY_GAME', {list: manager.getUserPlay(room), room: room});
      io.to(socket.room).emit('USER_JOIN_GAME', manager.getRoomByOne(room));
    });
    socket.on('START_PLAY', async (room) => {
      if(manager.addPlayer(room, user, socket.id)){
        const result = updateUserPlay('player_o', user.id, room);
        io.to(socket.room).emit('USER_PLAY_GAME',{list: [user], room: room });
      }
    })
    socket.on('PLAY_CHESS', async (data) => {
      let squares = await getGame(data.room);
      squares = squares[0].detail||'{}';
      squares = JSON.parse(squares);
      const exist = Object.values(squares).find(value => value==data.chess)
      if(exist==undefined)
      {
        const checkCurState = manager.checkCurState(data.room, data.chess, user);
        const count = Object.keys(squares).length
        if(checkCurState){
          io.to(socket.room).emit('GET_PLAY_CHESS', {chess: data.chess, value:checkCurState%2?'O':'X'});
          const winner = checkWin(squares, data.chess, checkCurState%2?'O':'X');
          squares[count] = data.chess;
          const update = {
            detail: JSON.stringify(squares),
            result: winner?checkCurState%2?'O':'X':null
          }
          let result = await updateGame(update, socket.room);
          if(winner)
          {
            io.to(socket.room).emit('WIN_GAME', {username: user.username});
            manager.updateStatus(data.room);
          }
        }
      }
    });
    socket.on('GET_NEW_CHESSBOARD', async () => {
      const result = manager.getRoom();
      socket.emit('GET_NEW_CHESSBOARD', result);
    });
  });
}

const checkWin = (squaresObject, chess, type) => {

  const squares = Array(20).fill(null);
  for(let i=0; i<20;i++)
  squares[i] = Array(20).fill(null);
  Object.keys(squaresObject).map((key) =>  {
    return squares[parseInt(squaresObject[key]/20)][squaresObject[key]%20] = Number(key)%2?'O':'X';
  });
  const result = Array(4);
  result[0] = checkRow(squares, parseInt(chess/20), chess%20 - 4, chess%20, type);
  result[1] = checkCol(squares, chess%20, parseInt(chess/20) - 4, parseInt(chess/20), type);
  result[2] = checkCheo1(squares, parseInt(chess/20) - 4 , chess%20 - 4, chess%20, type);
  result[3] = checkCheo2(squares, parseInt(chess/20) + 4, chess%20 - 4, chess%20, type);
  return result.find(element => element==4)!=undefined?true:false;
}
const checkRow = (square, i, j, col,  type) => {
  if(j > col+4) return 0;
  if(j < 0) return checkRow(square, i, j+1,  col,  type) + 0;
  if(j >= 20 ) return 0;
  const count = square[i][j]==type?1:0
  return (checkRow(square, i, j+1,  col,  type) + count);
}
const checkCol = (square, i, j, col,  type) => {
  if(j > col+4) return 0;
  if(j < 0) return checkCol(square, i, j+1,  col,  type);
  if(j >= 20 ) return 0;
  const count = square[j][i]==type?1:0;
  return checkCol(square, i, j+1,  col,  type) + count;
}
const checkCheo1 = (square, i, j, col, type) => {
  if(j > col+4) return 0;
  if(i<0||j<0) return checkCheo1(square, i+1, j+1, col, type);
  if(i>=20||j>=20) return 0;
  const count = square[i][j]==type?1:0;
  return checkCheo1(square, i+1, j+1, col, type) + count;
}
const checkCheo2 = (square, i, j, col, type) => {
  if(j > col+4) return 0;
  if(i<0||j>=20) return 0;
  if(i>=20||j<0)  return checkCheo2(square, i-1, j+1, col, type);
  const count = square[i][j]==type?1:0;
  return checkCheo2(square, i-1, j+1, col, type) + count;
}
