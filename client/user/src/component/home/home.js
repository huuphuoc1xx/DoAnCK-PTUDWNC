import React, { useState, useEffect, useContext } from "react";
import NavHome from "../Nav";


function Home() {
  // const [listUser, setListUser] = useState([]);
  // const [socket, setSocket] = useState();
  // useEffect(() => {
  //   const socket = socketIOClient(`${config.socket}`, {
  //     path: "/socket",
  //     query: { token: Cookies.get("jwt") },
  //     withCredentials: true
  //   })
  //   console.log(socket)
  //   socket.on("online", (data) => {
  //     setListUser(JSON.parse(data));
  //   });
  //   socket.on("list", (data) => {
  //     setListUser(JSON.parse(data));
  //   });
  //   socket.on("offline", (data) => {
  //     setListUser(JSON.parse(data));
  //   });
  //   setSocket(socket);
  // }, []);
  // useBeforeunload(() => {
  //   try {
  //     socket.emit("offline");
  //     return "asdf";

  //   } catch (error) {
  //     console.log(error);
  //     return "asdf";
  //   }
  // });
 
  return (
    <>
      <NavHome>
            lll
      </NavHome>
    </>
  );
}
export default Home;
