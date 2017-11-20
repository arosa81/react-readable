import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import NoItem from './NoItem';

import { likePost, dislikePost, deleteExistingPost } from '../actions/posts';
import { fetchComments } from '../actions/comments';

import moment from 'moment';

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
    }
  }

  componentDidMount() {
    const { post } = this.props;
    if (post !== undefined) {
      if (this.props.match.params.postID) {
        this.props.queryComments(post.id)
      }
    } else {
      return (
        <NoItem />
      )
    }
  }

  handleVote = (e) => {
    const { post } = this.props;

    e.preventDefault();
    if (e.target.id === 'LIKE') {
      this.props.voteLikePost(post.id)
      setTimeout(() => {
      }, 200)
    }
    else if (e.target.id === 'DISLIKE') {
      this.props.voteDislikePost(post.id)
    }
  }

  handleDeletePost = (e, post) => {
    const { deletePost } = this.props;
    e.preventDefault();
    deletePost(post);
  }

  render() {
    const { post, comments } = this.props;
    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';
    return (
      <div>
        { (post !== undefined && post.title !== undefined) && (
          <div className="card mb-3">
            <div className="card-header btn-toolbar justify-content-between"
              aria-label="card header with button groups">
              <Link className="text-dark" to={{ pathname: `/Edit Post`, state: { post }, }}>
                <i className="fa fa-pencil fa-fw"></i> Edit
              </Link>
              <button className="btn btn-outline-danger btn-sm"
                onClick={(e) => {this.handleDeletePost(e, post)}}>
                <i className="fa fa-trash-o"></i>
              </button>
            </div>
            <div className="card-body">
              <Link to={`/${post.category}/${post.id}`}>
                <h4 className="card-title">{post.title}</h4>
              </Link>
              <div className="btn-toolbar justify-content-between">
                <div className="card-subtitle mb-2 text-muted">
                  {moment(new Date(post.timestamp)).format('YYYY-MM-DD hh:mm:ss a')} by {post.author}
                </div>
                <p className="badge badge-pill badge-info">{post.category}</p>
              </div>
              <textarea readOnly className="card-text container" value={post.body}
                        style={{border: 'none'}}></textarea>
              <div className="btn-toolbar justify-content-between">
                <div className="btn-group btn-group-sm" role="group" onClick={(e) => {this.handleVote(e)}}>
                  <button className="btn btn-outline-success" id={LIKE}>
                    <i className="fa fa-thumbs-up" id={LIKE}></i>
                  </button>
                  <button><span className="badge badge-pill badge-secondary">Votes {post.voteScore}</span></button>
                  <button className="btn btn-outline-danger" id={DISLIKE}>
                    <i className="fa fa-thumbs-down" id={DISLIKE}></i>
                  </button>
                </div>
                <div className="text-dark">{post.commentCount} Comments</div>
              </div>
            </div>
          </div>
      )}
    </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const comments = state.commentReducer.comments.filter((comment) => comment.parentId === ownProps.match.params.postID);
  return {
    comments: comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikePost: (post) => dispatch(likePost(post)),
    voteDislikePost: (post) => dispatch(dislikePost(post)),
    deletePost: (post) => dispatch(deleteExistingPost(post)),
    queryComments: (postID) => dispatch(fetchComments(postID)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
