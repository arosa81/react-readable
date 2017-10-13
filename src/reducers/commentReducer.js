import { GET_COMMENT, ADD_COMMENT } from '../actions/comments';

const initialState = {
  comments: []
}

export default (state=initialState, action) => {
  console.log('action: ': action);
  switch (action.type) {
    case GET_COMMENT:
      console.log('get comments reducer');
      break;
    case ADD_COMMENT:
      console.log('add comment reducer');
      break;
    default:
      return state;
  }
}
