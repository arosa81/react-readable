import { GET_POST, ADD_POST } from '../actions/posts';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/posts'

const initialState = {
  posts: []
}

export default (state=initialState, action) => {
  console.log('action: ': action);
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: [...action.posts]
      }
    default:
      return state;
  }
}
