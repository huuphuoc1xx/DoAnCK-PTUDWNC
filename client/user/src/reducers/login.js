import { userConstants } from '../constans/users.contants';



export function login(state = {}, action){
    switch(action.type){
        case userConstants.LOGIN_SUCCESS :
            return {
                loaggedIn: true,
                user: action.result
            };
        case userConstants.LOGIN_FAILURE:
                return {};
        case userConstants.LOGOUT:
                return {}; 
        default:
            return {
                loaggedIn: true   
            }
    }
}