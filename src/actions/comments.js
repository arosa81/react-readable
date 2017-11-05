import * as api from '../utils/api';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
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
     .then((comments) => dispatch(receiveComments(comments)))
);

export const likeComment = (postID, commentID) => dispatch => (
  api
    .voteComment(commentID, 'upVote')
    .then(() => { api.getComments(postID)
                     .then((comment) => { dispatch(upVoteComment(comment)) })
                })
);

export const dislikeComment = (postID, commentID) => dispatch => (
  api
    .voteComment(commentID, 'downVote')
    .then(() => { api.getComments(postID)
                     .then((comment) => { dispatch(downVoteComment(comment)) })
                })
);