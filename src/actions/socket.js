
import io from "socket.io-client";

import { selectRoom, getRooms } from "actions/room";

export const connectToSocket = () => {
  console.log("lol")
  return (dispatch, getState) => {
    const token = getState().auth.token;
    // const socket = io.connect(process.env.SOCKET_URL);
    const socket = io.connect("http://localhost:8008");
      console.log("hei")
    socket.on('connect', function () {
      console.log("hei")
      socket
        .emit('authenticate', { token, }) //send the jwt
        .on('authenticated', function () {
          //do other things
          console.log("authenticated!")
        })
        .on('unauthorized', function(msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        })
    });

    socket.on('connect', function(){
      console.log("connected")
      dispatch(getRooms());
      dispatch(selectRoom({
        name: "main-lobby"
      }));
    });

    socket.on('server:push', function(data){
      console.log("gotcha server:push", data)
      data.map(action => {
        dispatch(action)
      })
    });

    socket.on('disconnect', function(){
      console.log("disconnected!")
    });

    return dispatch(setSocket(socket));
  };
}

export const setSocket = (socket) => (
  {
    type: "SET_SOCKET",
    payload: {
      socket,
    }
  }
)

export const disconnectSocket = (socket) => (
  {
    type: "DISCONNECT_SOCKET",
  }
)