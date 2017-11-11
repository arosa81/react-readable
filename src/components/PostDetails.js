import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { likePost, dislikePost } from '../actions/posts';
import { fetchComments, fetchComment } from '../actions/comments';

class PostDetails extends Component {
  componentDidMount() {
    const { post } = this.props;
    this.props.queryComments(post.id);
  }

  render() {
    const { post, comments } = this.props;
    console.log(this.props);
    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';
    const commentList = comments.map((comment) => (

      <div key={comment.id}>
        <div>{comment.body}</div>
        <div>{comment.author}</div>
        <div>{new Date(comment.timestamp).toLocaleTimeString().toString()}</div>
        <div style={{display: 'inline-block'}} onClick={(e) => {this.handleVote(e)}}>
          <button id={LIKE}>LIKE</button>
          <button id={DISLIKE}>DISLIKE</button>
        </div>
        <Link to={{ pathname: `/Edit Comment`, state: { post, comment }, }}>
          <button>Edit Comment</button>
        </Link>
        <br/>
        <br/>
      </div>
    ));
    return (
      <div>
        <br/>
        <div>Title: {post.title}</div>
        <div>Description: {post.body}</div>
        <div>Author: {post.author}</div>
        <div>Category: {post.category}</div>
        <div>Vote Score: {post.voteScore}</div>
        <div style={{display: 'inline-block'}} onClick={(e) => {this.handleVote(e)}}>
          <button id={LIKE}>LIKE</button>
          <button id={DISLIKE}>DISLIKE</button>
        </div>
        <Link to={{ pathname: `/Edit Post`, state: { post }, }}>
          <button>Edit Post</button>
        </Link>
        <br/>
        <h3>Comments</h3>
        <div style={{display: 'inline-block'}}>
          <Link to={{ pathname: `/Add Comment`, state: { post }, }}>
            <button name='createComment'>New Comment</button>
          </Link>
        </div>
        <br/>
        <br/>
        {commentList}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("COMMENTS STATE: ", state);
  return {
    categories: state.categoryReducer.categories,
    comments: state.commentReducer.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikePost: (post) => dispatch(likePost(post)),
    voteDislikePost: (post) => dispatch(dislikePost(post)),
    queryComments: (postID) => dispatch(fetchComments(postID)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
