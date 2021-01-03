import { userConstants } from '../constans/users.contants';
import { userService } from '../services/users';
import { history } from '../helpers/history';
import { ACTIONSOCKET } from '../constans/socket.contants';
import { connectSocket } from '../socket/socket';
function login(username, password, from, setMessage) {
    return dispatch => {
        userService.login(username, password).then(result => {
            if (result.code === 0) {
                dispatch({ type: userConstants.LOGIN_SUCCESS, data: username });
                connectSocket();
                dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: userConstants.UPDATE_LIST_USER });
                dispatch({ type: ACTIONSOCKET.EMIT, event: userConstants.USER_JOIN_SOCKET, data: username })

                history.push(from);

            } else {
                setMessage(result.data.message);
                dispatch({ type: userConstants.LOGIN_FAILURE, data: result });
            }

        })
    }
}

function autho() {

    return dispatch => {
        userService.autho().then(result => {
            if (result) {
                dispatch({ type: userConstants.LOGIN_SUCCESS, data: result.username });
            } else {
                history.push('/login');
            }
        })
    }
}
function register(username, name, password) {
    return dispatch => {
        userService.register(username, name, password).then(result => {
            if (result) {
                dispatch({ type: userConstants.LOGIN_SUCCESS, data: username });
                connectSocket();
                dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: userConstants.UPDATE_LIST_USER });
                dispatch({ type: ACTIONSOCKET.EMIT, event: userConstants.USER_JOIN_SOCKET, data: username })

                history.push("/");

            } else {
                dispatch({ type: userConstants.LOGIN_FAILURE, data: result });
            }

        })
    }
}
function subcribeListuser() {
    return dispatch => {
        return dispatch({ type: ACTIONSOCKET.SUBSCRIBE, event: userConstants.UPDATE_LIST_USER });
    }
}
function getListUser() {
    return dispatch => {
        return dispatch({ type: ACTIONSOCKET.EMIT, event: userConstants.USER_JOIN_SOCKET, data: 'username' })
    }
}
function logout() {

}

export const userAction = {
    login,
    logout,
    autho,
    subcribeListuser,
    getListUser,
    register
}