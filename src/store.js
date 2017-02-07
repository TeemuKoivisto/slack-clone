import { createStore,
  applyMiddleware, compose } from "redux";
import { combineReducers } from "redux-immutablejs";
import persistState from "redux-localstorage";
import { fromJS, Map } from "immutable";
import scour from "scourjs";
import thunk from "redux-thunk";

import logger from "middleware/logger";
import { handleRequest } from "middleware/api";
import { handleEmit } from "middleware/socket-io";

import reducers from "reducers";

// const scourCombineReducers = (reducers) => {
//   console.log("combining reducers", reducers)
//   const reducerKeys = Object.keys(reducers);
//   console.log(reducerKeys)

//   return (inputState, action) => {
//     console.log(inputState)
//     const temporaryState = scour(inputState);
//     reducerKeys.forEach((reducerName) => {
//       const reducer = reducers[reducerName];
//       const currentDomainState = temporaryState.get(reducerName);
//       const nextDomainState = reducer(currentDomainState, action);

//       temporaryState.set(reducerName, nextDomainState);
//     })
//     console.log(temporaryState)
//     return temporaryState;
//     // return inputState
//     //   .withMutations((temporaryState) => {
//     //     reducerKeys.forEach((reducerName) => {
//     //       const reducer = reducers[reducerName];
//     //       const currentDomainState = temporaryState.get(reducerName);
//     //       const nextDomainState = reducer(currentDomainState, action);

//     //       validateNextState(nextDomainState, reducerName, action);

//     //       temporaryState.set(reducerName, nextDomainState);
//     //     });
//     //   });
//   };
// }

// const combinedReducers = scourCombineReducers(reducers);
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
// const createPersistentStore = compose(
//   persistState(["auth", "room"], {
//     slicer: (paths) => (state) => scour(state).filter((value, key) => paths.indexOf(key) !== -1).toJSON(),
//     serialize: (subset) => {
//       const state = scour(subset).toJSON();
//       console.log("serializing", state)
//       return JSON.stringify(state)
//     },
//     deserialize: (serialized) => {
//       console.log("deserializing", serialized)
//       const state = scour(serialized ? JSON.parse(serialized) : {});
//       return state;
//     },
//     merge: (initial, persisted) => scour(initial).set(persisted),
//   })
// )(createStoreWithMiddleware);
const store = createPersistentStore(rootReducer);

export default store;
