import React, { useState } from "react";
import "./Login.css";
import logo from "../../asset/img/logo-blue.png";
import config from "../../config/config.json";
import { Form } from "react-bootstrap";
import Axios from "axios";
import { withRouter } from "react-router-dom";

Axios.defaults.withCredentials = true;
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState("");

  const onLogin = () => {
    Axios.post(`${config.dev.path}/login`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          window.location.href =
            new URLSearchParams(window.location.search).get("redirect_url") ||
            window.location.origin;
        } else {
          setError(res.data.data.message);
        }
      })
      .catch((err) => {
        setError("Network error!!!");
      });
  };

  return (
    <div>
      <div className="title-login blue-color">
        Caro Online
      </div>
      <div className="login-container">
        <h1>
          <a
            onClick={() => {
              setSignup(false);
              setError("");
            }}
            className={signup ? "tag" : "tag active"}
          >
            Đăng nhập
          </a>
        </h1>
        <div className="main-login">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            <Form.Control
              className="mb-3"
              placeholder="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></Form.Control>
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <div className="login-btn-container">
              <p className="text-danger mb-0">{error}</p>
              <button className="blue-btn" type="submit">
                Đăng nhập
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);