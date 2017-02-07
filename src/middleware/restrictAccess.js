import store from "../store";

export const redirectNonUser = (nextState, replace) => {
  // console.log(store.getState().get("auth").get("user"))
  const user = store.getState().get("auth").get("user").toJS();
  if (user.role === undefined) {
    replace({
      pathname: "/login",
    });
  }
};

export const redirectNonAdmin = (nextState, replace) => {
  const user = store.getState().get("auth").get("user").toJS();
  if (user.role !== "admin") {
    replace({
      pathname: "/login",
    });
  }
};
