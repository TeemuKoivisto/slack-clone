
import io from "socket.io-client";

export const createRequest = (action, store) => {
  const token = store.getState().auth.token;
  const socket = store.getState().socket.socket;
  const request = action.payload.request;

  socket.emit(`${request.method}+${request.url}`, request.data)

  return store.dispatch({
    type: action.type + "_SOCKET",
    payload: action.payload.data,
  });
};

export const handleRequest = store => next => action => {
  next(action);
  if (action.payload && action.payload.socket) {
    return createRequest(action, store);
  }
};
