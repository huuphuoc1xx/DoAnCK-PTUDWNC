import Cookies from "js-cookie";
import config from "../config/config.json";
import io from 'socket.io-client';
let socket;
function connectSocket(value) {
    socket = io(`${config.socket}`, {
        path: "/socket",
        query: { token: Cookies.get("jwt") },
        withCredentials: true
      });
}

export { socket, connectSocket };