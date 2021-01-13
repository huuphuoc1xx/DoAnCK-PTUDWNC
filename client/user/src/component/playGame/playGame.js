import React, { useEffect } from 'react';
import Game from './game/game';
import NavHome from "../Nav";
import './playGame.css';
import Item from "../home/itemUser";
import { history } from '../../helpers/history';
import { useSelector, useDispatch } from 'react-redux';
import AuthProvider from "../../provider/AuthProvider";
import { Button } from 'react-bootstrap';
import { userService } from '../../services/users';
import { PLAYGAMECONTANTS } from "../../constans/playGame.contants";
import { ACTIONSOCKET } from "../../constans/socket.contants";
import { Redirect } from 'react-router-dom';
export const PlayGame = () => {
  const player = null;
  const user_win = useSelector(state => state.playReduce.user_win);
  const userPlayer = useSelector(state => state.playReduce.listUserPlay);
  const room = useSelector(state => state.playReduce.room);
  const dispatch = useDispatch();
  const playGame = () => {
    dispatch({ type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.START_PLAY, data: room });
  }
  useEffect(() => {
    return () => {
      dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.OUT_ROOM});
    }
  },[])
  if(!userPlayer)
    return <Redirect to="/"/>;
  return (
    <>
      <AuthProvider>
        <NavHome>
          <div className='flex-container' on>
            <div className='flex-game'><Game player={player} /></div>
            <div className='flex-user'>
              <Button variant="dark" onClick={playGame}>Play</Button>
              <br/>
              {user_win} Thắng
              {userPlayer.map((user, index) => <div style={{
                fontSize: "14px",
                border: `1px solid ${user_win === user.username ? "red" : "black"}`,
                margin: "3px"
              }}> Người chơi {index + 1} <Item user={user}></Item> </div>)}
            </div>
            <div className='flex-chat'>chat</div>
          </div>
        </NavHome>
      </AuthProvider>
    </>
  )
}