import { PLAYGAMECONTANTS } from '../constans/playGame.contants';
import { history } from '../helpers/history';
export function playReduce(state = {},action){
    switch (action.type){
        case PLAYGAMECONTANTS.USER_JOIN_GAME:
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
                listUserJoinGame: [],
                room: null
            }
        case PLAYGAMECONTANTS.FAST_PLAY:
            alert('fast_play')
            state.squares = Array(20 * 20).fill(null);
            state.listUserPlay = [];
            state.listUserJoinGame = [];
            state.room = null;
            return {
                ...state,
             }
        case PLAYGAMECONTANTS.START_FAST:
            console.log("START_LAY", action.data.list);
            
            return {
                ...state,
                listUserPlay: [...state.listUserPlay, ...action.data.list],
                room: action.data.room
            }
        case PLAYGAMECONTANTS.GET_PLAY_CHESS:
            const squares = state.squares;
            squares[action.data.chess] = action.data.value;
            state.squares = squares;
            return {
                ...state,
                squares: [...state.squares]
            } 
        case PLAYGAMECONTANTS.USER_PLAY_GAME:
            state.listUserPlay = [];
            return{
                ...state,
                listUserPlay: [...state.listUserPlay, ...action.data.list],
                room: action.data.room
            }
        case PLAYGAMECONTANTS.GET_NEW_CHESSBOARD:
            return {
                ...state,
                chessBoard: action.data
            }
        case PLAYGAMECONTANTS.PLAY_CHESS:
            return{
                ...state
            }
        case PLAYGAMECONTANTS.WIN_GAME:
            alert('eein');
            return {
                ...state,
                user_win: action.data.username
            }
        case PLAYGAMECONTANTS.OUT_ROOM:
            return {
                ...state,
                room:null
            }
        default:
            return {
                ...state
            }
    }
}