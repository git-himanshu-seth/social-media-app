import { combineReducers } from "redux";
import { auth } from "./auth.reducers";
import { friend } from "./friends.reducer";
import { group } from "./group.reducer";
import { post } from "./posts.reducer";

const appReducers = combineReducers({
  auth,
  friend,
  group,
  post,
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
