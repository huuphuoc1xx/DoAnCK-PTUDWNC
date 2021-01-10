import React from "react";
import { Button } from "react-bootstrap";
import { PLAYGAMECONTANTS } from "../../constans/playGame.contants";
import { ACTIONSOCKET } from "../../constans/socket.contants";
import AuthProvider from "../../provider/AuthProvider";
import Nav from "../Nav";
import ListUser from "./listUser";
import { useDispatch } from 'react-redux';
import { history } from '../../helpers/history';
function Home(props) {
  const dispatch = useDispatch();
  const playNewGame = (e) => {
    e.preventDefault();
    dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_JOIN_GAME});
    dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.GET_PLAY_CHESS});
    dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.WIN_GAME});
    dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_PLAY_GAME});
    dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.START_GAME});
    history.push('/playgame');
  }
  const findGame = (e) => {
    e.preventDefault();
    history.push('/chessboard');
  }
  return (
    <AuthProvider>
      <Nav />
      <div className="flex-container">
        <div className="main-container justify-content-center ">
        <div className = "home">
        <Button onClick = {playNewGame}className = "btPlay" >Play</Button>
        <Button onClick = {findGame} className = "btPlay">Danh sách bàn cờ</Button>
        <Button className = "btPlay">Chơi Nhanh</Button>
        <Button className = "btPlay">Mời người chơi</Button>
      </div>
        </div>
        <div className='list-container'>
          <ListUser />
        </div>
      </div>
      
    </AuthProvider>
  );
}
export default Home;
