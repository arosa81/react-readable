import * as api from '../utils/api';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function requestCategories(categories) {
  return {
    type: REQUEST_CATEGORIES,
    categories
  }
}

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
