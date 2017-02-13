
import { fromJS } from "immutable";

import {
  LOGIN_USER,
} from "actions/auth";

const INITIAL_STATE = fromJS({
  user: {},
  currentRoomId: null,
  token: "",
  expires: undefined,
  loading: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
      // return state;
      return state.set("loading", true);
    case "LOGIN_USER_SUCCESS":
      return state.merge({
        user: action.payload.user,
        token: action.payload.token,
        expires: action.payload.expires,
        loading: false
      });
    case "LOGIN_USER_FAIL":
      return state.set("loading", false);
    case "ROOM_SELECT_ONE":
      return state.set("currentRoomId", fromJS(action.payload._id));
    case "ROOM_JOIN_ONE_SUCCESS":
      let userId = state.getIn(["user", "_id"])
      return state.updateIn(["currentRoomId"], currentRoomId => {
        if (action.payload.user._id === userId) {
          return action.payload.room._id;
        }
        return currentRoomId;
      })
    case "ROOM_LEAVE_ONE_SUCCESS":
      return state.updateIn(["currentRoomId"], currentRoomId => {
        if (action.payload.user._id === state.getIn(["user", "_id"]) && action.payload.room._id === currentRoomId) {
          return undefined;
        }
        return currentRoomId;
      })
    default:
      return state;
  }
}
