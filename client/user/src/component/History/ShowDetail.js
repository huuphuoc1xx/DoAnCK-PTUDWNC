import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination } from "react-bootstrap";
import  { usePopup }  from "../../provider/PopupProvider";

function ShowDetail({ info }) {
  const   showPopup  = usePopup();
  console.log("SHOWW_POPUP",'l');
  return (
    <Button
      variant="secondary"
      onClick={() => {
        showPopup(<GameDetail info={info} />);
      }}
    >
      <i className="fa fa-eye" aria-hidden="true"></i>
    </Button>
  );
}

function GameDetail({ info }) {
  let detail, message;
  try {
    detail = JSON.parse(info.detail || "[]");
    message = JSON.parse(info.message || "[]");
  } catch (error) {
    detail = [];
    message = [];
  }

  const [moveCount, setMoveCount] = useState(0);
  const [board, setBoard] = useState({});
  const [play, setPlay] = useState(true);

  useEffect(() => {
    if (moveCount < detail.length) {
      const curBoard = {};
      for (let index = 0; index <= moveCount; index++) {
        const x = Math.floor(detail[index] / 20),
          y = detail[index] % 20;
        curBoard[x] = curBoard[x] || {};
        curBoard[x][y] = index % 2 ? "O" : "X";
      }
      setBoard(curBoard);
      if (play) {
        const interval = setInterval(() => {
          setMoveCount(moveCount + 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [moveCount, play]);
  const renderBoard = () => {
    const src = [];
    for (let i = 0; i < 20; i++) {
      const temp = [];
      for (let j = 0; j < 20; j++) {
        temp.push(
          <div className="cell">
            <b>{board[i] ? board[i][j] || "" : ""}</b>
          </div>
        );
      }
      src.push(<div className="row-cell">{temp}</div>);
    }
    return src;
  };
  return (
    <>
      <Modal.Header closeButton> GAME ID: {info.id}</Modal.Header>
      <Modal.Body className="game">
        <div className="side-frame">
          <div className="chat">
            <h5 style={{ borderBottom: "2px solid black" }}>Chat</h5>
            {message.map((item) => (
              <div>
                {item.username}:{item.mess}
              </div>
            ))}
          </div>
        </div>
        <div className="game-frame">
          <div className="board">{renderBoard()}</div>
        </div>
        <div className="side-frame">
          <div className="history">
            <h5 style={{ borderBottom: "2px solid black" }}>History</h5>
            <div style={{ borderBottom: "2px solid black" }}>
              <Pagination>
                <Pagination.First onClick={() => setMoveCount(0)} />
                <Pagination.Prev onClick={() => setMoveCount(moveCount - 1)} />
                <Pagination.Next onClick={() => setMoveCount(moveCount + 1)} />
                <Pagination.Item onClick={() => setPlay(!play)} active>
                  {play ? (
                    <i className="fa fa-pause" aria-hidden="true"></i>
                  ) : (
                      <i className="fa fa-play" aria-hidden="true"></i>
                    )}
                </Pagination.Item>
              </Pagination>
            </div>
            {detail.map((item, index) => (
              <>
                {index <= moveCount && (
                  <div>
                    {`${index % 2 ? "O" : "X"}: (${Math.floor(item / 20)},${item % 20
                      })`}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </Modal.Body>
    </>
  );
}

export default ShowDetail;
