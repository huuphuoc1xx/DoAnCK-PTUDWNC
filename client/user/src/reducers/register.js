import { userConstants } from '../constans/users.contants';


export function register(state = {},action){
    switch (action.type){
        case userConstants.REGISTER_SUCCESS:
            return { };
        case userConstants.REGISTER_FAILD:
            return { };
        default:
            return { };
    }
}