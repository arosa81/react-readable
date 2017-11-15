import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { likeComment, dislikeComment, deleteExistingComment } from '../actions/comments';
import { fetchComments, fetchComment } from '../actions/comments';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
  }

  handleVote = (e) => {
    const { comment } = this.props;

    e.preventDefault();
    if (e.target.id === 'LIKE') {
      this.props.voteLikeComment(comment.id)
      setTimeout(() => {
      }, 200)
    }
    else if (e.target.id === 'DISLIKE') {
      this.props.voteDislikeComment(comment.id)
    }
  }

  handleDeleteComment = (e, comment) => {
    const { deleteComment } = this.props;
    e.preventDefault();
    deleteComment(comment);
  }

  render() {
    const { comment } = this.props;
    console.log("Comment PROPS: ", this.props);
    let dateOptions = { formatMatcher: 'best fit' };
    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';

    return (
      <div key={comment.id}>
        <div>{comment.body}</div>
        <div>{comment.author}</div>
        <div>{new Date(comment.timestamp).toLocaleTimeString().toString()}</div>
        <div style={{display: 'inline-block'}} onClick={(e) => {this.handleVote(e)}}>
          <button id={LIKE}>LIKE</button>
          <button id={DISLIKE}>DISLIKE</button>
          <button onClick={(e) => {this.handleDeleteComment(e, comment)}}>DELETE</button>
        </div>
        <Link to={{ pathname: `/Edit Comment`, state: { comment }, }}>
          <button>Edit Comment</button>
        </Link>
        <br/>
        <br/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikeComment: (comment) => dispatch(likeComment(comment)),
    voteDislikeComment: (comment) => dispatch(dislikeComment(comment)),
    deleteComment: (comment) => dispatch(deleteExistingComment(comment)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Comment));
