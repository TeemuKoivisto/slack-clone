
import scour from "scourjs";

const INITIAL_STATE = scour({
  currentRoom: {},
  rooms: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ROOM_GET_ONE_SUCCESS":
      action.payload.created = new Date(action.payload.created);
      // return Object.assign({}, state, {
      //   currentRoom: action.payload,
      // })
      return state.set(["currentRoom"], action.payload);
    case "ROOM_GET_ALL_SUCCESS":
      // return Object.assign({}, state, {
      //   rooms: action.payload.map(room => {
      //     room.created = new Date(room.created);
      //     return room;
      //   }),
      // })
      return state.set(["rooms"], action.payload.map(room => {
        room.created = new Date(room.created);
        return room;
      }))
    case "ROOM_SAVE_ONE_SUCCESS":
      action.payload.created = new Date(action.payload.created);
      // return Object.assign({}, state, {
      //   rooms: [...state.rooms, action.payload],
      // })
      return state.set(["rooms"], [...state.get("rooms"), action.payload])
    case "MESSAGE_SAVE_ONE_SUCCESS":
      action.payload.created = new Date(action.payload.created);
      // if (state.currentRoom._id !== action.payload.Room) {
      //   console.log("lol ei oikee")
      // }
      return state.set(["currentRoom", "messages"], [...state.get("currentRoom.messages"), action.payload]);
      // return Object.assign({}, state, {
      //   currentRoom: {
      //     messages: [...state.currentRoom.messages, action.payload],
      //   },
      // })
    default:
      return state;
  }
}
