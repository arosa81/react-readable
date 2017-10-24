import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT
} from '../actions/comments';

const initialState = {
  comments: [],
}

export default (state=initialState, action) => {
  console.log('action COMMENTS: ', action);
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case RECEIVE_COMMENT:
    case UP_VOTE_COMMENT:
    case DOWN_VOTE_COMMENT:
      return {
        ...state,
        comments: action.comments
      }
    default:
      return state;
  }
}
