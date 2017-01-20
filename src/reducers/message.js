
const INITIAL_STATE = {
  messages: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_MESSAGE_EMIT":
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload],
      })
    default:
      return state;
  }
}
