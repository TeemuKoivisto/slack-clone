
const INITIAL_STATE = {
  socket: undefined,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SOCKET":
      return Object.assign({}, state, {
        socket: action.payload.socket,
      })
    case "DISCONNECT_SOCKET":
      state.socket.disconnect();
      return INITIAL_STATE;
    default:
      return state;
  }
}
