import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { likeComment, dislikeComment, deleteExistingComment } from '../actions/comments';

import moment from 'moment';

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
      this.props.voteLikeComment(comment)
    }
    else if (e.target.id === 'DISLIKE') {
      this.props.voteDislikeComment(comment)
    }
  }

  handleDeleteComment = (e, comment) => {
    const { deleteComment } = this.props;
    e.preventDefault();
    deleteComment(comment);
  }

  render() {
    const { comment } = this.props;
    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';

    return (
      <div key={comment.id} className="card mb-3">
        <div className="card-body">
          <div className="btn-toolbar justify-content-between">
            <Link className="text-dark" to={{ pathname: `/Edit Comment`, state: { comment }, }}>
              <i className="fa fa-pencil fa-fw"></i> Edit
            </Link>
            <button className="btn btn-outline-danger btn-sm"
              onClick={(e) => {this.handleDeleteComment(e, comment)}}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
          <textarea readOnly className="card-text container" value={comment.body}
            style={{border: 'none'}}></textarea>
          <div className="card-subtitle mb-2 text-muted">
            {moment(new Date(comment.timestamp)).format('YYYY-MM-DD hh:mm:ss a')} by {comment.author}
          </div>
          <p className="badge badge-pill badge-info">{comment.category}</p>
          <div className="btn-group btn-group-sm" role="group" onClick={(e) => {this.handleVote(e)}}>
            <button className="btn btn-outline-success" id={LIKE}>
              <i className="fa fa-thumbs-up" id={LIKE}></i>
            </button>
            <button><span className="badge badge-pill badge-secondary">Votes {comment.voteScore}</span></button>
            <button className="btn btn-outline-danger" id={DISLIKE}>
              <i className="fa fa-thumbs-down" id={DISLIKE}></i>
            </button>
          </div>
        </div>
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
