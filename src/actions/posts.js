import * as api from '../utils/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts.filter((post) => post.deleted === false),
    receivedAt: Date.now(),
  }
}

function addPost(posts) {
  return {
    type: ADD_POST,
    posts: posts.filter((post) => post.deleted === false),
    timeStamp: Date.now(),
  }
}

function deletePost(posts) {
  return {
    type: DELETE_POST,
    posts: posts.filter((post) => post.deleted === false),
    timeStamp: Date.now(),
  }
}

function editPost(posts) {
  return {
    type: EDIT_POST,
    posts: posts.filter((post) => post.deleted === false),
    timeStamp: Date.now(),
  }
}

function upVotePost(posts) {
  return {
    type: UP_VOTE_POST,
    posts: posts.filter((post) => post.deleted === false),
    timeStamp: Date.now(),
  }
}

function downVotePost(posts) {
  return {
    type: DOWN_VOTE_POST,
    posts: posts.filter((post) => post.deleted === false),
    timeStamp: Date.now(),
  }
}

export const fetchPosts = () => dispatch => (
  api.getPosts()
     .then((posts) => dispatch(receivePosts(posts)))
);

export const addNewPost = (post) => dispatch => (
  api.addPost(post)
     .then(() => { api.getPosts()
                      .then((p) => { dispatch(addPost(p)) })
     })
)

export const deleteExistingPost = (post) => dispatch => (
  api.deletePost(post.id)
     .then(() => { api.getPosts()
                      .then((p) => { dispatch(deletePost(p)) })
     })
)

export const editExistingPost = (post) => dispatch => (
  api.editPost(post)
     .then(() => { api.getPosts()
                      .then((p) => { dispatch(editPost(p)) })
     })
)

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
