import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import defaultReducer from "./reducers/defaultReducer";
import userReducer from "./reducers/userReducer";
import chatReducer from "./reducers/chatReducer";
import roomReducer from "./reducers/roomReducer";
import socketReducer from "./reducers/socketReducer";

const reducers = combineReducers({
  userReducer,
  chatReducer,
  roomReducer,
  socketReducer,
  //add another reducer if necessary
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
