import { PLAYGAMECONTANTS } from '../constans/playGame.contants';

export function playReduce(state = {},action){
    switch (action.type){
        case PLAYGAMECONTANTS.USER_JOIN_GAME:
            console.log()
            return {
                ...state,
                listUserJoinGame: action.data
            }
        case PLAYGAMECONTANTS.JOIN_GAME:
            return {
                ...state,
                squares: Array(20 * 20).fill(null),
                listUserPlay: [],
                listUserJoinGame: []
            }
        case PLAYGAMECONTANTS.START_GAME:
            return {
                ...state,
                squares: Array(20 * 20).fill(null),
                listUserPlay:[],
                listUserJoinGame: []
            }
        case PLAYGAMECONTANTS.GET_PLAY_CHESS:
            return {
                ...state,
                squares: action.data.squares,
                play:action.data.play
            } 
        case PLAYGAMECONTANTS.USER_PLAY_GAME:
            
            return{
                ...state,
                listUserPlay: [...state.listUserPlay, ...action.data]
            }
        case PLAYGAMECONTANTS.GET_NEW_CHESSBOARD:
            return {
                ...state,
                chessBoard: action.data
            }
        case PLAYGAMECONTANTS.PLAY_CHESS:
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