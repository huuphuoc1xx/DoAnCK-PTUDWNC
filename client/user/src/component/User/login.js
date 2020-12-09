import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import "./user.css";
import Axios from "axios";
import config from "../../config/config.json"

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert(username)
    Axios.post(`${config.base_path}/login`, { username, password }).then(res => {
      if (res.data.code === 0) {
        window.location.href = '/';
      } else {
        setErr(res.data.data.message);
      }
    }).catch(setErr("Login faild!"))
  };

  return (
    <div id="logreg-forms">
      <div className="form-signin">
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          Sign in
      </h1>
        <div className="social-login">
          <button className="btn facebook-btn social-btn">
            Sign in with Facebook
        </button>
          <button className="btn google-btn social-btn">
            Sign in with Google+
        </button>
        </div>
        <p style={{ textAlign: "center" }}> OR </p>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success btn-block" type="submit">
            Sign in
        </button>
        </Form>
        <a className="linkForget" href="#" >
          Forgot password?
      </a>
        <hr></hr>
        <div className="bbb">
          <Link to={"/register"}>
            <button
              className="btn btn-primary btn-block removeregister"
              type="button"
              id="btn-signup "

            >
              <i className="fas fa-user-plus"></i> Sign up New Account
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
