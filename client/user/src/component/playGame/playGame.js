import React from 'react';
import Game from './game/game';
import NavHome from "../Nav";
import './playGame.css';
import { history } from '../../helpers/history';
import { useSelector, useDispatch } from 'react-redux';
import AuthProvider from "../../provider/AuthProvider";
import { Button } from 'react-bootstrap';
import { userService } from '../../services/users';
import { PLAYGAMECONTANTS } from "../../constans/playGame.contants";
import { ACTIONSOCKET } from "../../constans/socket.contants";
export const PlayGame = () => {
  const player = useSelector(state => state.playReduce.x);
  const user_win = useSelector(state => state.playReduce.user_win);
  const userPlayer = useSelector(state => state.playReduce.listUserPlay);
  const room = useSelector(state => state.playReduce.room);
  const dispatch = useDispatch();
  const playGame = () => {
    dispatch({type: ACTIONSOCKET.EMIT,event: PLAYGAMECONTANTS.START_PLAY, data: room}); 
  }
  if (user_win) {
    alert(user_win + 'win');
    history.push('/');
  }
  return (
    <>
      <AuthProvider>
        <NavHome>
          <div className='flex-container'>
            <div className='flex-game'><Game player={player} /></div>
            <div className='flex-user'>
            <Button onClick={playGame}>Play</Button>
            {userPlayer.map(user => (<div>{user.username}</div>))}
            </div>
            <div className='flex-chat'>chat</div>
          </div>
        </NavHome>
      </AuthProvider>
    </>
  )
}