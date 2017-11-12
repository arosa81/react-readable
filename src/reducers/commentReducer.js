import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT
} from '../actions/comments';

const initialState = {
  comments: [],
}

export default (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case RECEIVE_COMMENT:
    case ADD_COMMENT:
    case DELETE_COMMENT:
    case EDIT_COMMENT:
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
