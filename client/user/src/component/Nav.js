import React, { useState, useEffect, useContext } from "react";
import { Navbar, FormControl, Form, Button } from "react-bootstrap";
import './index.css';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ListUser from '../component/home/listUser';
import { history } from '../helpers/history';
import { useSelector, useDispatch } from 'react-redux';
import { userConstants } from "../constans/users.contants";
import { playAction } from '../actions/playGame';
function Nav(props) {
  const [redirect, setRedirect] = useState(false);
  const [room, setRoom] = useState('');
  const username = useSelector(state => state.login);
  const dispatch = useDispatch();
  const newGame = () =>{
    dispatch(playAction.startNewGame());
  }
  const handleSubmit = () =>{
    dispatch(playAction.joinGame(room));
  }
  return redirect || (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <div className="mr-auto">
          <Form inline onSubmit = {handleSubmit}>
            <FormControl type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={room}
            onChange={(e) => setRoom(e.target.value)}/>
            <Button variant="outline-info" type="submit">Search</Button>
          </Form>
          
        </div>
        <Button variant="outline-info" onClick={newGame} className ='button' x>New game</Button>
        <div className = 'username'> </div>

      </Navbar>
      <div className="flex-container">
        <div className="main-container">
          {props.children}
        </div>
        <div className='listUser-container'>
          <ListUser />
        </div>
      </div>

    </>
  );
}

export default Nav;
