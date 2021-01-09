

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
    const user_o = false;
    let listUser = [user_x];
    listRoom.push({user_o:user_o, user_x:user_x, room: room, listUser:listUser, status:0});
  } else {
    listRoom[index].room = room;
  }
}
const addRoomExits = (room, user, socketId) => {
  const userAdd  = {
    userId: user.id,
    username: user.username,
    socketId: socketId,
  };
  const index = listRoom.findIndex(value => value.room==room);
  
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
    if(value.room == room) return value.listUser;
  });
}
const getRoom = () => {
  if(!listRoom.length) return [];
  const result = listRoom.reduce((listResult, room) => {
    listResult.push({room: room.room, status: room.status});
    return listResult;
  }, []);
  return result;
}
const addPlayer = (user) => {
  const index = listRoom.findIndex(value => value.listUser.forEach(User => User.UserId===user.User.Id));
  if(index>0)
  {
    const user_o = {
    userId: user.id,
    username: user.username,
    socketId: socketId,
    }
    listRoom[index].user_o=user_o;
    return listRoom[index].room;
  }
  return false
}
const getUserPlay = (room) => {
  let listUserPlay = [];
  listRoom.forEach(value => {
    if(value.room == room){
      listUserPlay.push(value.user_x);
      value.user_o?listUserPlay.push(value.user_o):null;
    }
  });
  return listUserPlay;
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
  getUserPlay
}