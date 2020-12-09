const passport = require('passport');
const user = require('../bus/user');
const passportStrategy = require('../config/passport');
const manager = require('./manager');
passportStrategy(passport);

module.exports = server => {
  const socket = require('socket.io');
  const io = socket(server, {
    path: "/socket"
  });

  io.use((socket, next) => {
    passport.authenticate('jwt', (err, user) => {
      if (!err&&user)
      { 
        socket.request.user=user;
        next();
      }
    })(socket.request, {}, next)
  });

  io.of('/').on('connection', socket => {
    const user = socket.request.user;
    manager.addUser(user, socket.id);
    socket.emit("list", manager.getListOnline());
    io.emit("online", { userId: user.id });
  });

  io.of('/').on('disconect', socket => {
    const user = socket.request.user;
    manager.removeUser(user.id);
    io.emit("offline", { userId: user.id });
  });
}
