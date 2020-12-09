import React, { useState, useEffect } from "react";
import NavHome from "../Nav";
import ListUser from "./listUer";
import "./home.css";
import Axios from "axios";
import config from "../../config/config.json";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [listUers, setListUsers] = useState([]);

  useEffect(() => {
    Axios.get(`${config.base_path}`).then(res => {
          setIsLoaded(true);
          setListUsers(res.data.data.listUser);
        })},[]);

    if (isLoaded) {
      return <>Loadding........</>;
    } else {
      return (
        <>
          <NavHome>
            <div className="containerE">
              <div className="divListUser">
                <ListUser listUser={listUers}></ListUser>
              </div>
              <div></div>
            </div>
          </NavHome>
        </>
      );
    }
}
export default Home;
