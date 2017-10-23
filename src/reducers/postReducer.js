import {
  RECEIVE_POSTS,
  UP_VOTE_ITEM,
  DOWN_VOTE_ITEM
} from '../actions/posts'

const initialState = {
  posts: [],
}

export default (state=initialState, action) => {
  // console.log("REDUCER actiooooooon", action);
  switch (action.type) {
    case RECEIVE_POSTS:
    case UP_VOTE_ITEM:
    case DOWN_VOTE_ITEM:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
}
