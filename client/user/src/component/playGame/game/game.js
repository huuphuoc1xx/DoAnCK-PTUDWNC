import React from 'react';
import '../playGame.css';
import Board from './board';
import { useDispatch, useSelector } from 'react-redux';
import { PLAYGAMECONTANTS } from "../../../constans/playGame.contants";
import { ACTIONSOCKET } from "../../../constans/socket.contants";

function Game(props) {
    const dispatch = useDispatch();
    let squares = useSelector(state => state.playReduce.squares);
    let room = useSelector(state => state.playReduce.room);
    const handleClick = (i) => {
        const data = {room: room, chess: i}
        dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.PLAY_CHESS,data: data})
    };
    return (<Board
        squares={squares}
        onClick={(i) => handleClick(i)}
        col={20}
        row={20}
    />
    );
}

export default Game;