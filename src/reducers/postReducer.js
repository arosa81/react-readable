import { ADD_POST } from '../actions/posts';

const initialState = {
  posts: []
}

export default (state=initialState, action) => {
  console.log('action: ': action);
  switch (action.type) {
    case ADD_POST:
      console.log('add post reducer');
      break;
    default:
      return state;
  }
}
