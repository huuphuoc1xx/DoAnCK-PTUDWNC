

let listUser = [];

let listRoom = [];

let listRandom = [];
const { startGame, updateGame, getGame, updateUserPlay } = require('../models/game');
const addUser = (user, socketId) => {
  const curUser = listUser.find(value => value.userId === user.id);
  if (!curUser) {
    listUser.push({ userId: user.id, username: user.username, socketId });
  } else {
    curUser.socketId = socketId;
  }
}
const addRoom = (room, user, socketId) => {
  const curUser = listRoom.find(value => value.room === room && value.userId === user.id);
  if (!curUser) {
    const user_x = {
      userId: user.id,
      username: user.username,
      socketId: socketId,
    };
    const user_o = false;
    let listUser = [user_x];
    listRoom.push({ user_o: user_o, user_x: user_x, room: room, listUser: listUser, status: 0 });
  } else {
    curUser.room = room;
  }
}
const addRoomExits = (room, user, socketId) => {
  const userAdd = {
    userId: user.id,
    username: user.username,
    socketId: socketId,
  };
  const index = listRoom.findIndex(value => value.room == room);
  console.log(index)
  if (index == -1) return;
  listRoom[index].listUser.push(userAdd);
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
  return listRoom.forEach(value => {
    if (value.room == room) return value.listUser;
  });
}
const getRoom = () => {
  if (!listRoom.length) return [];
  const result = listRoom.reduce((listResult, room) => {
    listResult.push({ room: room.room, status: room.status });
    return listResult;
  }, []);
  return result;
}
const addPlayer = (room, user, socketId) => {
  const index = listRoom.findIndex(value => value.room == room);
  if (listRoom[index].status) return;
  if (user.id == listRoom[index].user_x.userId) return;
  if (index >= 0);
  {
    const user_o = {
      userId: user.id,
      username: user.username,
      socketId: socketId,
    }
    listRoom[index].user_o = user_o;
    listRoom[index].status = 1;
    return listRoom[index].room;
  }
  return false
}
const getUserPlay = (room) => {
  let listUserPlay = [];
  listRoom.forEach(value => {
    if (value.room == room) {
      listUserPlay.push(value.user_x);
      value.user_o ? listUserPlay.push(value.user_o) : null;
    }
  });
  return listUserPlay;
}
const checkCurState = (room, user) => {
  const roomInfo = listRoom.find(value => value.room == room);
  if (!roomInfo) return false;
  const { status, user_o, user_x } = roomInfo;
  if (!status) return false;
  if (status % 2 == 1 && user.id == user_o.userId) return false;
  if ((status % 2 == 0) && user.id == user_x.userId) return false;
  roomInfo.status = status % 2 + 1;
  return roomInfo.status;
}
const updateStatus = (room) => {
  const index = listRoom.findIndex(value => value.room == room);
  if (index >= 0) {
    let newListRoom = listRoom.slice(0, index);
    newListRoom = [...newListRoom, listRoom.slice(index + 1, listRoom.length)[0]];
    listRoom = newListRoom;
  }
}
const getRoomById = (userId) => {
  return listRoom.find(value => value.listUser.find(user => user.userId == userId));
}
const outRoom = (userId) => {
  const roomInfo = getRoomById(userId);
  if (!roomInfo) return;
  roomInfo.listUser = roomInfo.listUser.filter(user => user.userId != userId);
  if (roomInfo.status == 2) return;
  roomInfo.status = 2;
  if (roomInfo.listUser.length === 0) {
    listRoom = listRoom.filter(value => value.room != roomInfo.room);
    return;
  }
  let winner = null;
  switch (userId) {
    case roomInfo.user_x.userId:
      winner = 'O';
      roomInfo.user_x = null;
      break;
    case roomInfo.user_o.userId:
      winner = 'X';
      roomInfo.user_o = null;
      break;
    default:
      break;
  };
  if (!winner) return;
  updateUserPlay('result', winner, roomInfo.room);
}
const getRandomUser = async (user, socket) => {
  if (!listRandom.length) {
    listRandom.push({ user: user, socket: socket });
    return false;
  }
  const userRandom = listRandom[0];
  listRandom.splice(0, 1);
  return userRandom;
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
  addRoomExits,
  addPlayer,
  getUserPlay,
  checkCurState,
  updateStatus,
  outRoom,
  getRandomUser
}