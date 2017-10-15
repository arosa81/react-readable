import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  // SORT_POSTS
} from '../actions/posts'

const initialState = {
  posts: [],
}

export default (state=initialState, action) => {
  console.log("actiooooooon", action);
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
}
