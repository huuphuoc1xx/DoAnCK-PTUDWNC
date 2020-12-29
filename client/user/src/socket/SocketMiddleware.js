import { ACTIONSOCKET } from '../constans/socket.contants';
import { socket, connectSocket } from './socket';
function socketMiddleware () { 
      connectSocket();
      socket.on('connect', () => {
     });
      return ({ dispatch }) => next => action =>{
          if(typeof action ==='function') return next(action);
          const { type, event, handle, data } = action;
          switch(type) {
              case ACTIONSOCKET.SUBSCRIBE:
                  const eventHandle = typeof handle ==='function'? handle : defaultHandle(event);
                  socket.on(event, eventHandle);
                  return eventHandle;
              case ACTIONSOCKET.UNSUBSCRIBE:
                  //dispatch();
                  if(typeof handle !=='function') throw new Error('err unsubcribe');

                  socket.removeListener(event, handle);
                  break;
              case ACTIONSOCKET.EMIT:
                  dispatch({ type: event, data });
                  return socket.emit(event, data);
              default:
                    return next(action);

          };
          function defaultHandle(event) {
             return data => dispatch({ type: event, data}); 
          }
      }
}

export {
    socketMiddleware
}