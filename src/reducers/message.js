
const INITIAL_STATE = {
  messages: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // case "MESSAGE_GET_ALL_SUCCESS":
    //   return Object.assign({}, state, {
    //     messages: action.payload.map(msg => {
    //       msg.created = new Date(msg.created);
    //       return msg;
    //     }),
    //   })
    // case "MESSAGE_SAVE_ONE_SUCCESS":
    //   action.payload.created = new Date(action.payload.created);
    //   return Object.assign({}, state, {
    //     messages: [...state.messages, action.payload],
    //   })
    // case "GET_MESSAGE":
    default:
      return state;
  }
}
