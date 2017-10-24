import { combineReducers } from 'redux';

import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import commentReducer from './commentReducer';

export default combineReducers ({
  postReducer,
  categoryReducer,
  commentReducer,
})
