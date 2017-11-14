import { combineReducers } from 'redux';

import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import commentReducer from './commentReducer';
import userReducer from './userReducer';

export default combineReducers ({
  userReducer,
  postReducer,
  categoryReducer,
  commentReducer,
})
