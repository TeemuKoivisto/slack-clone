import { browserHistory } from "react-router";

import { connectToSocket } from "actions/socket";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    return dispatch(loginAction(email, password)).then((action) => {
      if (action.type === "LOGIN_USER_SUCCESS") {
        dispatch(connectToSocket());
        browserHistory.push("/user/me");
      }
      return action;
    })
  };
}

const loginAction = (email, password) => (
  {
    type: LOGIN_USER,
    payload: {
      request: {
        url: "/login",
        method: "post",
        data: {
          email,
          password
        }
      }
    }
  }
);

export const loginAnonUser = (data) => {
  return (dispatch, getState) => {
    return dispatch(loginAnonAction(data)).then((action) => {
      if (action.type === "LOGIN_USER_SUCCESS") {
        dispatch(connectToSocket());
        browserHistory.push("/user/me");
      }
      return action;
    })
  };
}

const loginAnonAction = (data) => (
  {
    type: LOGIN_USER,
    payload: {
      request: {
        url: "/login/anon",
        method: "post",
        data,
      }
    }
  }
);

export const logout = () => (
  {
    type: LOGOUT_USER,
  }
)

export const logoutAnon = (data) => (
  {
    type: "LOGOUT_ANON_USER",
    payload: {
      socketio: {
        data,
      }
    }
  }
)