
export const ROOM_GET_ALL = "ROOM_GET_ALL";
export const ROOM_GET_ONE = "ROOM_GET_ONE";
export const ROOM_SAVE_ONE = "ROOM_SAVE_ONE";

export const getRooms = () => (
  {
    type: ROOM_GET_ALL,
    payload: {
      socketio: {
        data: {}
      }
    }
  }
);

export const getRoom = (data) => (
  {
    type: ROOM_GET_ONE,
    payload: {
      socketio: {
        data,
      }
    }
  }
);

export const selectRoom = (data) => (
  {
    type: "ROOM_SELECT_ONE",
    payload: data,
  }
);

export const saveRoom = (data) => (
  {
    type: ROOM_SAVE_ONE,
    payload: {
      socketio: {
        data,
      }
    }
  }
);

export const joinRoom = (data) => (
  {
    type: "ROOM_JOIN_ONE",
    payload: {
      socketio: {
        data,
      }
    }
  }
);

export const leaveRoom = (data) => (
  {
    type: "ROOM_LEAVE_ONE",
    payload: {
      socketio: {
        data,
      }
    }
  }
);