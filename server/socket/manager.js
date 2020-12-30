
const listUser = [];

const listRoom = [];

const addUser = (user, socketId) => {
  const index = listUser.findIndex(value => value.userId === user.id);
  if (index < 0 || isNaN(index)) {
    listUser.push({ userId: user.id, username: user.username, socketId });
  } else {
    listUser[index].socketId = socketId;
  }
}
const addRoom = (room, user, socketId) => {
  const index = listRoom.findIndex(value => value.room === room&&value.userId===user.id);
  if (index < 0 || isNaN(index)) {
    const user_x  = {
      userId: user.id,
      username: user.username,
      socketId: socketId,
    };
    const user_oo = {}
    listRoom.push({user_oo, user_x, room: room });
  } else {
    listRoom[index].room = room;
  }
}
const addRoomExits = (room, user, socketId) => {
  const user_o  = {
    userId: user.id,
    username: user.username,
    socketId: socketId,
  };
  const index = listRoom.findIndex(value => value.room==room);
  listRoom[index].user_oo = user_o;
}
const removeUser = (userId) => {
  const index = listUser.findIndex(item => item.userId === userId);
  listUser.splice(index, 1);
}

const getUserSocketId = (userId) => {
  const user = listUser.find(value => value.userId === userId);
  return user.socketId;
}

const getListOnline = () => {
  return listUser.map(item => { return { userId: item.userId, username: item.username } });
}
const getRoomByOne = (room) => {
  return listRoom.find(value => value.room == room);
}
const getRoom = () => {
  return listRoom;
}
const getRoomByUser = (socketId) => users.find((user) => user.socketId === socketId);
module.exports = {
  addUser,
  addRoom,
  removeUser,
  getUserSocketId,
  getListOnline,
  getRoomByUser,
  getRoomByOne,
  getRoom,
  addRoomExits
}