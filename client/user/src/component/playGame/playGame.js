import React from 'react';
import Game from './Game/Game';
import NavHome from "../Nav";
import './PlayGame.css';
import { history } from '../../helpers/history';
import { useSelector, useDispatch } from 'react-redux';
export const PlayGame = () => {
  const player = useSelector(state => state.playReduce.x);
  const user_win = useSelector(state => state.playReduce.user_win);
  if (user_win) {
    alert(user_win + 'win');
    history.push('/');
  }
  return (
    <>
      <NavHome>
        <div className='flex-container'>
          <div className='flex-game'><Game player={player} /></div>
          <div className='flex-user'>2 users</div>
          <div className='flex-chat'>chat</div>
        </div>
      </NavHome>
    </>
  )
}