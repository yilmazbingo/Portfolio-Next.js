import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import slateReducer from "./reducers/slateReducer";

export default (initialState = {}) => {
  const store = createStore(
    combineReducers({ edito: slateReducer }),
    initialState,
    applyMiddleware(thunk)
  );
  return store;
};
