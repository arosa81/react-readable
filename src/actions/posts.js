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
    posts: posts.filter(post => post.deleted === false),
    receivedAt: Date.now(),
  }
}

// function receivePostsByCategory(posts, category) {
//   return {
//     type: RECEIVE_POSTS_BY_CATEGORY,
//     posts,
//     category
//   }
// }

function upVotePost(posts) {
  return {
    type: UP_VOTE_ITEM,
    posts: posts.filter(post => post.deleted === false),
    timeStamp: Date.now(),
  }
}

function downVotePost(posts) {
  return {
    type: DOWN_VOTE_ITEM,
    posts: posts.filter(post => post.deleted === false),
    timeStamp: Date.now(),
  }
}

export const fetchPosts = () => dispatch => (
  api.getPosts()
     .then((posts) => dispatch(receivePosts(posts)))
);

export const likePost = (id) => dispatch => (
  api
    .votePost(id, 'upVote')
    .then(() => { api.getPosts()
                     .then((post) => { dispatch(upVotePost(post)) })
                })
);

export const dislikePost = (id) => dispatch => (
  api
    .votePost(id, 'downVote')
    .then(() => { api.getPosts()
                     .then((post) => { dispatch(downVotePost(post)) })
                })
);


// export const sortPosts = (posts) => ({
//     type: SORT_POSTS,
//     posts
// })
