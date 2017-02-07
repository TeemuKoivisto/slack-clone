
import scour from "scourjs";
import { fromJS } from "immutable";

import {
  LOGIN_USER,
} from "actions/auth";

const INITIAL_STATE = fromJS({
  user: {},
  token: "",
  expires: undefined,
  loading: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
      return state;
      // return state.set("loading", true);
      // return Object.assign({}, state, { loading: true });
    case "LOGIN_USER_SUCCESS":
      return state.merge({
        user: action.payload.user,
        token: action.payload.token,
        expires: action.payload.expires,
        loading: false
      });
      // return state.set(action.payload).set("loading", false);
      // return {
      //   user: action.payload.user,
      //   token: action.payload.token,
      //   loading: false,
      // };
    case "LOGIN_USER_FAIL":
      return state.set("loading", false);
      // return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
}
