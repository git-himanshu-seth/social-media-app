import { combineReducers } from 'redux';
import { auth } from './auth.reducers';

const appReducers = combineReducers({
    auth,
});

const rootReducer = (state, action) => {
    return appReducers(state, action);
}

export default rootReducer;
