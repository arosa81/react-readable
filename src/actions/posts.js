import * as api from '../utils/api';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
// export const SORT_POSTS = 'SORT_POSTS';
export const UP_VOTE_ITEM = 'UP_VOTE_ITEM';
export const DOWN_VOTE_ITEM = 'DOWN_VOTE_ITEM';

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
  }
}


function upVotePost(id) {
  return {
    type: UP_VOTE_ITEM,
    id,
    voteOption: 'upVote',
    timeStamp: Date.now(),
  }
}

function downVotePost(post) {
  return {
    type: DOWN_VOTE_ITEM,
    post,
    timeStamp: Date.now(),
  }
}

export const fetchPosts = () => dispatch => (
  api
    .getAllPostsAPI()
    .then((posts) => dispatch(receivePosts(posts)))
);

export const likePost = (id) => dispatch => (
  api
    .votePost(id)
    .then((posts) => dispatch(receivePosts(posts)))
);

// export const sortPosts = (posts) => ({
//     type: SORT_POSTS,
//     posts
// })
