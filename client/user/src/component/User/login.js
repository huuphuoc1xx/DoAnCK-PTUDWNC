import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import Axios from "axios";
import { useDispatch } from 'react-redux';
import { userAction } from '../../actions/users';
Axios.defaults.withCredentials = true;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const from = '/';
      dispatch(userAction.login(username, password, from, setMessage));
    }
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
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="text-danger mt-3">{message}</p>
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
