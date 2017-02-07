import { createStore,
  applyMiddleware, compose } from "redux";
import { combineReducers } from "redux-immutablejs";
import persistState from "redux-localstorage";
import { fromJS, Map } from "immutable";
import thunk from "redux-thunk";

import logger from "middleware/logger";
import { handleRequest } from "middleware/api";
import { handleEmit } from "middleware/socket-io";

import reducers from "reducers";

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    return combinedReducers(undefined, action);
  }
  return combinedReducers(state, action);
};

const createStoreWithMiddleware = applyMiddleware(thunk, handleRequest, handleEmit, logger)(createStore);
const createPersistentStore = compose(
  persistState(["auth", "room"], {
    slicer: (paths) => (state) => state.filter((v, k) => paths.indexOf(k) !== -1),
    serialize: (subset) => JSON.stringify(subset.toJS()),
    deserialize: (serialized) => fromJS(JSON.parse(serialized)),
    merge: (initial, persisted) => new Map(initial).mergeDeep(persisted),
  })
)(createStoreWithMiddleware);
const store = createPersistentStore(rootReducer);

export default store;
