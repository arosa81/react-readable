import * as api from '../utils/api';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
    receivedAt: Date.now(),
  }
}

export const fetchCategories = () => dispatch => (
  api
    .getCategories()
    .then((categories) => dispatch(receiveCategories(categories)))
);
