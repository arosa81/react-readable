import * as api from '../utils/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts.filter(post => post.deleted === false),
    receivedAt: Date.now(),
  }
}

function upVotePost(posts) {
  return {
    type: UP_VOTE_POST,
    posts: posts.filter(post => post.deleted === false),
    timeStamp: Date.now(),
  }
}

function downVotePost(posts) {
  return {
    type: DOWN_VOTE_POST,
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
