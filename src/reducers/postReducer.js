import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST
} from '../actions/posts'

const initialState = {
  posts: [],
}

export default (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
    case ADD_POST:
    case EDIT_POST:
    case DELETE_POST:
    case UP_VOTE_POST:
    case DOWN_VOTE_POST:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
}
