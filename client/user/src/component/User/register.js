import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./user.css";
import { userAction } from "../../actions/users";
import { useDispatch } from "react-redux";
export default function Register() {
  const [name, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 6) {
      setMessage("Username too short");
      return;
    }
    if (password.length < 6) {
      setMessage("Password too short");
      return;
    }
    if (rePassword !== password) {
      setMessage("Confirm password not match");
      return;
    }

    dispatch(userAction.register(username, name, password));
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
          <Form onSubmit={handleSubmit}>
            <Form.Label>Full name</Form.Label>
            <Form.Control value={name} onChange={(e) => setFullName(e.target.value)} />
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
            <p className="text-danger mt-3">{message}</p>
            <button className="btn btn-primary btn-block" type="submit"><i className="fas fa-user-plus"></i> Sign Up</button>
          </Form>
          <div className="bbb"><Link to={'/login'}><i className="fas fa-angle-left" /> Back</Link></div>
        </div>
      </div></>
  );
}
