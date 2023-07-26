import { combineReducers } from '@reduxjs/toolkit';
import user_state from './reducers/user_state';

const rootReducer = combineReducers({
  user: user_state,
});

export default rootReducer;