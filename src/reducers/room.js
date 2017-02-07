
import scour from "scourjs";
import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  currentRoom: {},
  currentRoomIndex: -1,
  rooms: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ROOM_GET_ONE_SUCCESS":
      action.payload.created = new Date(action.payload.created);
      return state.updateIn(["rooms"], rooms => rooms.map(room => {
        return room.get("_id") === action.payload._id ? fromJS(action.payload) : room;
      }))
      .set("currentRoom", fromJS(action.payload))
      // return state.set("rooms", state.get("rooms").map(room => room._id === action.payload._id ? action.payload : room))
      //   .set("currentRoom", action.payload)
    case "ROOM_GET_ALL_SUCCESS":
      const roomsUpdated = action.payload.map(room => {
        room.created = new Date(room.created);
        return room;
      })
      return state.merge(fromJS({
        rooms: roomsUpdated
      }))
    case "ROOM_SAVE_ONE_SUCCESS":
    case "MESSAGE_SAVE_ONE_SUCCESS":
    // case "ROOM_GET_ONE_SUCCESS":
    //   action.payload.created = new Date(action.payload.created);
    //   // return Object.assign({}, state, {
    //   //   currentRoom: action.payload,
    //   // })
    //   return state.set("rooms", state.get("rooms").map(room => room._id === action.payload._id ? action.payload : room))
    //     .set("currentRoom", action.payload)
    // case "ROOM_GET_ALL_SUCCESS":
    //   // return Object.assign({}, state, {
    //   //   rooms: action.payload.map(room => {
    //   //     room.created = new Date(room.created);
    //   //     return room;
    //   //   }),
    //   // })
    //   return state.set(["rooms"], action.payload.map(room => {
    //     room.created = new Date(room.created);
    //     return room;
    //   })).set("currentRoom", action.payload.find(room => room.name === "main-lobby"))
    // case "ROOM_SAVE_ONE_SUCCESS":
    //   action.payload.created = new Date(action.payload.created);
    //   // return Object.assign({}, state, {
    //   //   rooms: [...state.rooms, action.payload],
    //   // })
    //   return state.set(["rooms"], [...state.get("rooms"), action.payload])
    // case "MESSAGE_SAVE_ONE_SUCCESS":
    //   action.payload.created = new Date(action.payload.created);
    //   const updatedRoom = state.get("rooms").find((room) => room._id === action.payload.Room);
    //   // searches for the index where the new meeting should be inserted at
    //   // to keep the dates in ascending order
    //   // returns -1 if in last position
    //   const index = updatedRoom.messages.findIndex(msg => msg.created > action.payload.created);
    //   index !== -1 ? updatedRoom.messages.splice(index, 0, action.payload) : updatedRoom.messages.push(action.payload);

    //   const updatedState = state.go("rooms").map(room => room.get("_id") === updatedRoom._id ? updatedRoom : room);
    //   // return updatedState;
    //   return state.set("rooms", state.get("rooms").map(room => room._id === updatedRoom._id ? updatedRoom : room))

    default:
      return state;
  }
}
