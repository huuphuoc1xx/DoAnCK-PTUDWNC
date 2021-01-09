import React from 'react';
import '../playGame.css';
import Board from './board';
import { useDispatch, useSelector } from 'react-redux';
import { playAction } from '../../../actions/playGame';
function Game({player}) {
    const dispatch = useDispatch();
    let squares = useSelector(state => state.playReduce.squares);
    let play = useSelector(state => state.playReduce.play);
    const handleClick = (i) => {
        dispatch(playAction.playGame(squares,play,i));
    };
    const winner = false;
    let a = null;
    let b = null;
    let c = null;
    if (winner) {
        a = winner.a;
        b = winner.b;
        c = winner.c;
    }
    return (<Board
        squares={squares}
        onClick={(i) => handleClick(i)}
        col={20}
        row={20}
    />
    );
}

export default Game;