import { SUBMIT_USER } from '../actions/user';

const initialState = {
  user: ''
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SUBMIT_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state;
  }
}
