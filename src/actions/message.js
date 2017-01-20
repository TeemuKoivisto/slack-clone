export const MESSAGE_GET_ALL = "MESSAGE_GET_ALL";
export const MESSAGE_SAVE_ONE = "MESSAGE_SAVE_ONE";

export const getMessages = () => (
  {
    type: MESSAGE_GET_ALL,
    payload: {
      socket: {
        url: "/message",
        method: "get",
        data: {}
      }
    }
  }
);

export const saveMessage = (data) => (
  {
    type: MESSAGE_SAVE_ONE,
    payload: {
      socket: {
        url: "/message",
        method: "post",
        data,
      }
    }
  }
);