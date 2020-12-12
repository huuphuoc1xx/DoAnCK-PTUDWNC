import React, { useState, useEffect } from "react";
import NavHome from "../Nav";
import ListUser from "./listUser";
import "./home.css";
function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [listUser, setListUser] = useState([]);

  if (isLoaded) return <>Loadding........</>;
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
