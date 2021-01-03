import React from "react";
import { Navbar } from "react-bootstrap";
import './index.css';
import { useAuth } from "../provider/AuthProvider";
function Nav(props) {
  const user = useAuth();
  return (
    <Navbar bg="dark" variant="dark">
      <div className="col-6">
        <Navbar.Brand href="#home">Caro Online</Navbar.Brand>
      </div>
      <div className="col-6 justify-content-end align-items-center d-flex">

        <div className="profile">
          <img
            className="avatar"
            src="https://giupban.com.vn/wp-content/uploads/2019/09/hinh-anh-hot-girl-de-thuong-19.jpg"
          />
          <div className="userName">{user.username}</div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="top-button">
            <i className="fa fa-user"></i>
          </button>
          <button className="top-circle-btn">
            <i class="fa fa-history"></i>
          </button>
          <button className="top-circle-btn">
            <i className="fa fa-sign-out"></i>
          </button>
        </div>
      </div>
      <div className='username'> </div>

    </Navbar>
  );
}

export default Nav;
