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
module.exports = {
  addUser,
  removeUser,
  getUserSocketId,
  getListOnline
}