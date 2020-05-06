import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import slateReducer from "./reducers/slateReducer";
import authReducer from "./reducers/authReducer";

export default (initialState = {}) => {
  const store = createStore(
    combineReducers({ auth: authReducer }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
