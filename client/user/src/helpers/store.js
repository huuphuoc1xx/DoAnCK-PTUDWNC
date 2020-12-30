import { createStore, compose, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';
import { socketMiddleware } from '../socket/SocketMiddleware';
const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(socketMiddleware(), thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);