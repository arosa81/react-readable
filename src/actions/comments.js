import * as api from '../utils/api';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments: comments.filter((comment) => comment.deleted === false),
    receivedAt: Date.now(),
  }
}

function receiveComment (comment) {
  return {
    type: RECEIVE_COMMENT,
    comment,
    receivedAt: Date.now(),
  }
}

function addComment(comments) {
  return {
    type: ADD_COMMENT,
    comments: comments.filter((comment) => comment.deleted === false),
    timeStamp: Date.now(),
  }
}

function deleteComment(comments) {
  return {
    type: DELETE_COMMENT,
    comments: comments.filter((comment) => comment.deleted === false),
    timeStamp: Date.now(),
  }
}

function editComment(comments) {
  return {
    type: EDIT_COMMENT,
    comments: comments.filter((comment) => comment.deleted === false),
    timeStamp: Date.now(),
  }
}

function upVoteComment(comments) {
  return {
    type: UP_VOTE_COMMENT,
    comments: comments.filter((comment) => comment.deleted === false),
    timeStamp: Date.now(),
  }
}

function downVoteComment(comments) {
  return {
    type: DOWN_VOTE_COMMENT,
    comments: comments.filter((comment) => comment.deleted === false),
    timeStamp: Date.now(),
  }
}

export const fetchComments = (postID) => dispatch => (
  api.getComments(postID)
     .then((comments) => dispatch(receiveComments(comments)))
);

export const fetchComment = (postID) => dispatch => (
  api.getComment(postID)
     .then((comment) => dispatch(receiveComment(comment)))
);

export const addNewComment = (comment) => dispatch => (
  api.addComment(comment)
     .then(() => { api.getComments(comment.parentId)
                      .then((c) => { dispatch(addComment(c)) })
     })
)

export const editExistingComment = (comment) => dispatch => (
  api.editComment(comment)
     .then(() => { api.getComments(comment.parentId)
                      .then((c) => { dispatch(editComment(c)) })
     })
)

export const deleteExistingComment = (comment) => dispatch => (
  api.deleteComment(comment.id)
     .then(() => { api.getComments(comment.parentId)
                      .then((c) => { dispatch(deleteComment(c)) })
     })
)

export const likeComment = (comment) => dispatch => (
  api
    .voteComment(comment.id, 'upVote')
    .then(() => { api.getComments(comment.parentId)
                     .then((c) => { dispatch(upVoteComment(c)) })
                })
);

export const dislikeComment = (comment) => dispatch => (
  api
    .voteComment(comment.id, 'downVote')
    .then(() => { api.getComments(comment.parentId)
                     .then((c) => { dispatch(downVoteComment(c)) })
                })
);
