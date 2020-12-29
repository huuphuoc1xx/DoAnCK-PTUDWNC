import { userConstants } from '../constans/users.contants';

export function userReduce(state = {}, action){
    switch(action.type){
        case userConstants.UPDATE_LIST_USER:
            return {
                ...state,
                listUser: action.data
            }
        default:
            return state;
    }
}