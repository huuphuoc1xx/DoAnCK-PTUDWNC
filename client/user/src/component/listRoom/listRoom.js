import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Room } from './room';
import './index.css';
import Nav from '../Nav';
import AuthProvider from "../../provider/AuthProvider";
import { PLAYGAMECONTANTS } from "../../constans/playGame.contants";
import { ACTIONSOCKET } from "../../constans/socket.contants";
import { history } from '../../helpers/history';
export const ListRoom = (props) => {
    useEffect(() => {
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.GET_NEW_CHESSBOARD});
        dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.GET_NEW_CHESSBOARD});
    },[])
    const listRoom = useSelector(state => state.playReduce.chessBoard)||[];
    const dispatch = useDispatch();
    const joinGame = (room) => {
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_JOIN_GAME});
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.GET_PLAY_CHESS});
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.WIN_GAME});
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_PLAY_GAME});
        dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.JOIN_GAME, data: room});
        history.push('/playgame');
    }
    return (
    <AuthProvider>
        <Nav />
        <div className='list-room'>
            {listRoom.map(room => <Room room = {room} handleSubmit={joinGame}></Room>)}
        </div>
    </AuthProvider>
    )
}