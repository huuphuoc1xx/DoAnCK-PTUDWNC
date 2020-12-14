const passport = require("passport");
const passportStrategy = require("../config/passport");
const manager = require("./manager");
passportStrategy(passport);
const cors = require("cors");

module.exports = (server) => {
  const socket = require("socket.io");
  const io = socket(server, {
    path: "/socket",
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL,
      methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
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
    socket.emit("list", JSON.stringify(manager.getListOnline()));
    io.emit("online", JSON.stringify(manager.getListOnline()));
  });

  io.on("disconnect", (socket) => {
    console.log(socket)
    const user = socket.request.user;
    manager.removeUser(user.id);
    io.emit("offline", JSON.stringify(manager.getListOnline()));
  });
};
