import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Axios from "axios";
import config from "../config/config.json";
function Nav(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [reDirect, setRedirect] = useState(false);
  useEffect(() => {
    Axios.get(`${config.base_path}`)
      .then((res) => {
        if (res.data.code !== 0)
          {
            setIsLoading(true);
          }
      })
      .catch((err) => {
        console.log(err);
        window.location.href = `/login`;
        setRedirect(<Redirect to="/login" />);
      });
  }, []);
  return isLoading? (
    reDirect || 
      <>
        <Navbar
          style={{
            border: "2px solid #0080ff",
            background: "#0080ff",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Navbar.Brand>
            <Link to={`/`}>Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to={`/login`}>Logout</Link>
          </Navbar.Collapse>
        </Navbar>
        <div >{props.children}</div>
      </>
  ):<></>;
}

export default Nav;
