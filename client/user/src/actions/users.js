import { useContext } from 'react';
import { userConstants } from '../constans/users.contants';
import { userService } from '../services/users';
import { history } from '../helpers/history';
function login(username, password, from){
    return dispatch => {
        userService.login(username, password).then(result => 
            {
                if(result){
                    history.push(from);
                    dispatch({ type: userConstants.LOGIN_SUCCESS,result});
                }
                dispatch({ type: userConstants.LOGIN_FAILURE, result});
            })
    }
}


// function register(username, name, password){
//     return dispatch => {
//         userService.register(username, name, password).then(result => {
//             if(result) dispatch({ type: userConstants.REGISTER_SUCCESS,result});
//                 dispatch({ type: userConstants.REGISTER_FAILURE, result});
//         })
//     }
// }

function logout(){
    
}

export const userAction = {
    login, 
    
    logout
}