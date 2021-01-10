import { PLAYGAMECONTANTS } from '../constans/playGame.contants';

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
                listUserJoinGame: []
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
            if(state.room!=action.data.room) state.listUserPlay = [];
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
            alert(action.data.username + ' win');
            return {
                ...state,
                user_win: action.data.user_win
            }
        default:
            return {
                ...state
            }
    }
}