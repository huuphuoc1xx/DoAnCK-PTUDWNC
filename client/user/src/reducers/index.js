import { combineReducers } from 'redux';

import { login } from './login';
import { register } from './register';
import { userReduce } from './user'; 
import { playReduce } from './playGame';
const rootReducer = combineReducers({
    login,
    register,
    userReduce,
    playReduce
});

export default rootReducer;