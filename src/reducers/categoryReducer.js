import { GET_CATEGORY, ADD_CATEGORY } from '../actions/categories';

const initialState = {
  categores: []
}

export default (state=initialState, action) => {
  console.log('action: ': action);
  switch (action.type) {
    case GET_CATEGORY:
      console.log('get category reducer');
      break;
    case ADD_CATEGORY:
      console.log('add category reducer');
      break;
    default:
      return state;
  }
}
