import {
  RECEIVE_POSTS,
  UP_VOTE_POST,
  DOWN_VOTE_POST
} from '../actions/posts'

const initialState = {
  posts: [],
}

export default (state=initialState, action) => {
  // console.log("REDUCER actiooooooon", action);
  switch (action.type) {
    case RECEIVE_POSTS:
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
