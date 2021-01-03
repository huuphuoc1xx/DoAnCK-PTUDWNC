import config from '../config/config.json';
import Axios from 'axios';

function login(username, password) {
  return Axios.post(`${config.base_path}/login`, { username, password }).then(res => res.data).catch(console.log);
}

function register(username, name, password) {
  return Axios.post(`${config.base_path}/register`, { username, name, password }).then(res => res.data).catch(console.log);
}
function autho() {
  return Axios.get(`${config.base_path}/users/profile`).then(res => {
    if (res.data.code === 0) {
      return res.data.data.user;
    } else return 0;
  }).catch(err => alert(err))
}
function logout() {

}

export const userService = {
  login,
  register,
  logout,
  autho
}