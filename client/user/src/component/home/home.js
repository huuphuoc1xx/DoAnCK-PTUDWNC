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
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_JOIN_GAME });
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.GET_PLAY_CHESS });
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.WIN_GAME });
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_PLAY_GAME });
    dispatch({ type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.START_GAME });
    history.push('/playgame');
  }
  const findGame = (e) => {
    e.preventDefault();
    history.push('/chessboard');
  }
  const fastPlay = (e) => {
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_JOIN_GAME });
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.GET_PLAY_CHESS });
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.WIN_GAME });
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_PLAY_GAME });
    dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.START_FAST });
    dispatch({ type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.FAST_PLAY });
  }
  return (
    <AuthProvider>
      <Nav />
      <div className="flex-container">
        <div className="lobby col-md-8 col-lg-6 col-sm-12 m-auto">
          <div className="lobby-btn-container d-flex flex-column col-6">
            <div className="d-flex justify-content-center">
              <Button variant="secondary" onClick={playNewGame} className="lobby-btn" style={{
                borderRadius: "100%",
                height: "60px",
                width: "60px",
                marginBottom: "10px",
              }}>Chơi
              </Button>
            </div>
            <Button variant="dark" onClick={findGame} className="lobby-btn">Danh sách bàn cờ</Button>
            <Button variant="dark" onClick = {fastPlay} className="lobby-btn">Chơi Nhanh</Button>
            <Button variant="dark" className="lobby-btn">Mời người chơi</Button>
          </div>
        </div>
        <ListUser />
      </div>

    </AuthProvider>
  );
}
export default Home;
