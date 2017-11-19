import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Comment from './Comment';

import { likePost, dislikePost } from '../actions/posts';
import { fetchComments, fetchComment, deleteExistingComment } from '../actions/comments';

import sortBy from 'sort-by';
import moment from 'moment';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: '',
    }
  }

  componentDidMount() {
    const { post } = this.props;
    this.props.queryComments(post.id);
    this.setState({ sorting: '-timestamp' });
  }

  handleVote = (e) => {
    const { post } = this.props;

    e.preventDefault();
    if (e.target.id === 'LIKE') {
      this.props.voteLikePost(post.id)
    }
    else if (e.target.id === 'DISLIKE') {
      this.props.voteDislikePost(post.id)
    }
  }

  handleDeleteComment = (e, comment) => {
    const { deleteComment } = this.props;
    e.preventDefault();
    deleteComment(comment);
  }

  render() {
    const { post, comments } = this.props;
    const { sorting } = this.state;
    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';
    let commentsList = comments.sort(sortBy(sorting));
    return (
      <div>
        <br/>
        <div className="card mb-3 border-dark">
          <div className="card-header btn-toolbar justify-content-between">
            <Link className="text-dark" to={{ pathname: `/Edit Post`, state: { post }, }}>
              <i className="fa fa-pencil fa-fw"></i> Edit
            </Link>
          </div>
          <div className="card-body">
            <h4 className="card-title">{post.title}</h4>
            <div className="btn-toolbar justify-content-between">
              <div className="card-subtitle mb-2 text-muted">
                {moment(new Date(post.timestamp)).format('YYYY-MM-DD hh:mm:ss a')} by {post.author}
              </div>
              <p className="badge badge-pill badge-info">{post.category}</p>
            </div>
            <textarea readOnly className="card-text container" value={post.body}
              style={{border: 'none'}}></textarea>
            <div className="btn-group btn-group-sm" role="group" onClick={(e) => {this.handleVote(e)}}>
              <button className="btn btn-outline-success" id={LIKE}>
                <i className="fa fa-thumbs-up" id={LIKE}></i>
              </button>
              <button><span className="badge badge-pill badge-secondary">Votes {post.voteScore}</span></button>
              <button className="btn btn-outline-danger" id={DISLIKE}>
                <i className="fa fa-thumbs-down" id={DISLIKE}></i>
              </button>
            </div>
          </div>
        </div>
        <h3>Comments</h3>
        <Link to={{ pathname: `/Add Comment`, state: { post }, }}>
          <button className="btn btn-success btn-sm" name='createComment'>
            <i className="fa fa-plus" aria-hidden="true"></i> New Comment</button>
        </Link>
        <br/>
        <br/>
        {commentsList.map((comment) => (
          <Comment key={comment.id} comment={comment}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categoryReducer.categories,
    comments: state.commentReducer.comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikePost: (post) => dispatch(likePost(post)),
    voteDislikePost: (post) => dispatch(dislikePost(post)),
    queryComments: (postID) => dispatch(fetchComments(postID)),
    deleteComment: (comment) => dispatch(deleteExistingComment(comment)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
