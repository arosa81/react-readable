import * as api from '../utils/api';
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
    receivedAt: Date.now(),
    log: console.log("inside receivePosts: ", posts)
  }
}

export const fetchPosts = () => dispatch => (
  api
    .getAllPostsAPI()
    .then((posts) => { dispatch(receivePosts(posts)); console.log("inside posts.js fetchPosts: ", posts); })
);
