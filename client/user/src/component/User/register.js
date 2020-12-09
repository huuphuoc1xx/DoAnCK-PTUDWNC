import React, { useState, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Axios from "axios";
import config from "../../config/config.json";
import "./user.css";
export default function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.alert(fullName)
    Axios.post(`${config.base_path}/register`, { fullName, username, password, rePassword }).then(res => {
      if (res.data.code === 0) {
        alert("Register successful");
      }
    })
  };
  return (
    <>
      <div id="logreg-forms">
        <div className="form-signup">
          <div className="social-login">
            <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign up with Facebook</span> </button>
          </div>
          <div className="social-login">
            <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign up with Google+</span> </button>
          </div>

          <p style={{ textAlign: "center" }}>OR</p>
          <Form  onSubmit={handleSubmit}>
          <Form.Control type="text"  className="form-control" placeholder="Full name" value = {fullName}  onChange={(e) => setFullName(e.target.value)}/>
          <Form.Control type="text"  className="form-control" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)}/>
          <Form.Control type="password"  className="form-control" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Form.Control type="password" className="form-control" placeholder="Repeat Password"  value = {rePassword} onChange={(e) => setRePassword(e.target.value)}/>
          <button className="btn btn-primary btn-block" type="submit"><i className="fas fa-user-plus"></i> Sign Up</button>
          </Form>
          <div className = "bbb"><Link  to={'/login'}><i className="fas fa-angle-left" /> Back</Link></div>
          </div>
      </div></>
  );
}
