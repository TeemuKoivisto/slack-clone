
import io from "socket.io-client";

export const createSocketEmit = (action, store) => {
  const token = store.getState().auth.token;
  const socket = store.getState().socket.socket;
  const request = action.payload.socket;

  console.log("EMITTING " + `${request.method}+${request.url}`)
  socket.emit("action", { type: action.type, data: request.data });
  // socket.emit("action", action);

  return store.dispatch({
    type: action.type + "_SOCKET",
    payload: action.payload.data,
  });
};

export const handleEmit = store => next => action => {
  next(action);
  if (action.payload && action.payload.socket) {
    return createSocketEmit(action, store);
  }
};
