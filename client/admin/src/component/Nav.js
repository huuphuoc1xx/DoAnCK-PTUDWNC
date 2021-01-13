import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const onLogout=()=>{};
function Nav(props) {
  return (
    <div>
      <Navbar className="nav-bar">
        <Link to="/" className="logo d-flex">
          <i className="fa fa-trello icon"></i>{" "}
          <img className="title" src="" alt="logo"></img>
        </Link>
        <div className="right-nav">
          {props.topButton}
          <Link to="/profile" className="top-button">
            <i className="fa fa-user"></i>
          </Link>
          <button className="top-circle-btn" onClick={onLogout}>
            <i className="fa fa-sign-out"></i>
          </button>
        </div>
      </Navbar>
    </div>
  );
}

export default Nav;
