import { PLAYGAMECONTANTS } from '../constans/playGame.contants';
import { userService } from '../services/users';
import { history } from '../helpers/history';
import { ACTIONSOCKET } from '../constans/socket.contants';
function startNewGame(){
    return dispatch => {
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_JOIN_GAME});
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.GET_PLAY_CHESS});
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.WIN_GAME});
        dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.START_GAME});
        history.push('/playgame');
    } 
}
function joinGame(room){
    return dispatch => {
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.USER_JOIN_GAME});
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.GET_PLAY_CHESS});
        dispatch({type: ACTIONSOCKET.SUBSCRIBE, event: PLAYGAMECONTANTS.WIN_GAME});
        dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.JOIN_GAME, data: room});
        history.push('/playgame');
    }
}
function playGame(i){
    return dispatch => {
    dispatch({type: ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.PLAY_CHESS, data: {i:i}});
    }
}
export const playAction = {
    startNewGame,
    joinGame,
    playGame
}