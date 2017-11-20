import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';

import Comment from './Comment';
import NoItem from './NoItem';

import { likePost, dislikePost, deleteExistingPost } from '../actions/posts';
import { fetchComments, deleteExistingComment } from '../actions/comments';

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
    }
    else if (e.target.id === 'DISLIKE') {
      this.props.voteDislikePost(post.id)
    }
  }

  redirectBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleDeletePost = (e, post) => {
    const { deletePost } = this.props;
    e.preventDefault();
    deletePost(post);
    this.redirectBack();
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
    let commentsList;
    post !== undefined && (commentsList = comments.sort(sortBy(sorting)))
    return (
      <div>
        { post === undefined && <Redirect to='/noitem' />}
        { (post !== undefined && post.title !== undefined) && (
        <div><br/>
          <div className="card mb-3 border-dark">
            <div className="card-header btn-toolbar justify-content-between">
              <Link className="text-dark" to={{ pathname: `/Edit Post`, state: { post }, }}>
                <i className="fa fa-pencil fa-fw"></i> Edit
              </Link>
              <button className="btn btn-outline-danger btn-sm"
                onClick={(e) => {this.handleDeletePost(e, post)}}>
                <i className="fa fa-trash-o"></i>
              </button>
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
                <div className="text-dark">{comments.length} Comments</div>
              </div>
            </div>
          </div>
          <h3>Comments</h3>
          <Link to={{ pathname: `/Add Comment`, state: { post } }}>
            <button className="btn btn-success btn-sm" name='createComment'>
              <i className="fa fa-plus" aria-hidden="true"></i> New Comment</button>
            </Link>
            <br/>
            <br/>
            {commentsList.map((comment) => (
              <Comment key={comment.id} comment={comment}/>
            ))}
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const post = state.postReducer.posts.find((post) => post.id === ownProps.match.params.postID) || undefined;
  const comments = state.commentReducer.comments.filter((comment) => comment.parentId === ownProps.match.params.postID);
  return {
    comments: comments,
    post: post,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikePost: (post) => dispatch(likePost(post)),
    voteDislikePost: (post) => dispatch(dislikePost(post)),
    queryComments: (postID) => dispatch(fetchComments(postID)),
    deleteComment: (comment) => dispatch(deleteExistingComment(comment)),
    deletePost: (post) => dispatch(deleteExistingPost(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
