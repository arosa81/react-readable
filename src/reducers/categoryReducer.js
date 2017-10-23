import {
  RECEIVE_CATEGORIES
} from '../actions/categories'

const initialState = {
  categories: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories.categories
      }
    default:
      return state;
  }
}
