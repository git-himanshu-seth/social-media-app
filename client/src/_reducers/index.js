import { combineReducers } from "redux";
import { auth } from "./auth.reducers";
import { friend } from "./friends.reducer";

const appReducers = combineReducers({
  auth,
  friend,
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
