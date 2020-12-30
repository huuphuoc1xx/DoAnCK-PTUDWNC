import Cookies from "js-cookie";
import config from "./config.json";
import io from 'socket.io-client';

export const socketCofig = () => {
  let socket = io(`${config.socket}`, {
    path: "/socket",
    query: { token: Cookies.get("jwt") },
    withCredentials: true
  });
  return socket;
}

