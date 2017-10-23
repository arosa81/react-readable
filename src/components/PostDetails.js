import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { likePost, dislikePost } from '../actions/posts';


class PostDetails extends Component {

  render() {
    const { post } = this.props;
    console.log(this.props);
    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';
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
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    categories: state.categoryReducer.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikePost: (post) => dispatch(likePost(post)),
    voteDislikePost: (post) => dispatch(dislikePost(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
