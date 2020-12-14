import React, { useState, useEffect } from "react";
import NavHome from "../Nav";
import ListUser from "./listUser";
import "./home.css";
import config from "../../config/config.json";
import Cookies from "js-cookie";
import { useBeforeunload } from "react-beforeunload";

import socketIOClient from "socket.io-client";

function Home() {
  const [listUser, setListUser] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = socketIOClient(`${config.socket}`, {
      path: "/socket",
      query: { token: Cookies.get("jwt") },
    });
    socket.on("online", (data) => {
      setListUser(JSON.parse(data));
    });
    socket.on("list", (data) => {
      setListUser(JSON.parse(data));
    });
    socket.on("offline", (data) => {
      setListUser(JSON.parse(data));
    });
    setSocket(socket);
  }, []);
  useBeforeunload(() => {
    try {
      socket.emit("offline");
      return "asdf";

    } catch (error) {
      console.log(error);
      return "asdf";
    }
  });
  return (
    <>
      <NavHome>
        <div className="containerE">
          <div className="divListUser">
            <ListUser listUser={listUser}></ListUser>
          </div>
          <div></div>
        </div>
      </NavHome>
    </>
  );
}
export default Home;
