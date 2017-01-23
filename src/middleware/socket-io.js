
import io from "socket.io-client";

export const createSocketEmit = (action, store) => {
  const token = store.getState().auth.token;
  const socket = store.getState().socket.socket;
  const request = action.payload.socketio;

  socket.emit("action", { type: action.type, data: request.data });

  return store.dispatch({
    type: action.type + "_REQUEST",
    payload: action.payload.data,
  });
};

export const handleEmit = store => next => action => {
  next(action);
  if (action.payload && action.payload.socketio) {
    return createSocketEmit(action, store);
  }
};
