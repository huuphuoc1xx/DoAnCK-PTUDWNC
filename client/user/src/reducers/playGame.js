import { PLAYGAMECONTANTS } from '../constans/playGame.contants';

export function playReduce(state = {},action){
    switch (action.type){
        case PLAYGAMECONTANTS.USER_JOIN_GAME:
            return {
                ...state
            }
        case PLAYGAMECONTANTS.JOIN_GAME:
            return {
                x:'o'
            }
        case PLAYGAMECONTANTS.START_GAME:
            return {
                x:'x'
            }
        case PLAYGAMECONTANTS.GET_PLAY_CHESS:
            return {
                ...state,
                squares: action.data.squares,
                play:action.data.play
            } 
        case PLAYGAMECONTANTS.PLAY_CHESS:
            console.log('ppppp');
            break;
        case PLAYGAMECONTANTS.WIN_GAME:
            console.log(action.data.user_win);
            return {
                ...state,
                user_win: action.data.user_win
            }
        default:
            return state
    }
}