import React, { Component} from 'react';
import { connect } from 'react-redux';
import { likePost, dislikePost, deleteExistingPost } from '../actions/posts';
import { withRouter, Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
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
    const { post } = this.props;
    console.log("Post PROPS: ", this.props);
    // console.log("Post STATE: ", this.state);
    let dateOptions = { formatMatcher: 'best fit' };
    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';
    return (
      <div>
        <br/>
        <Link to={`/${post.category}/${post.id}`}>
          <div>Title: {post.title}</div>
        </Link>
        <div>Description: {post.body}</div>
        <div>Author: {post.author}</div>
        <div>Category: {post.category}</div>
        <div>Vote Score: {post.voteScore}</div>
        <div>Date Posted: {new Date(post.timestamp).toLocaleDateString().toString()}</div>
        <div style={{display: 'inline-block'}}>
          <div onClick={(e) => {this.handleVote(e)}}>
            <button id={LIKE}>LIKE</button>
            <button id={DISLIKE}>DISLIKE</button>
          </div>
          <button onClick={(e) => {this.handleDeletePost(e, post)}}>DELETE</button>
          <Link to={{ pathname: `/Edit Post`, state: { post }, }}>
            <button>Edit Post</button>
          </Link>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikePost: (post) => dispatch(likePost(post)),
    voteDislikePost: (post) => dispatch(dislikePost(post)),
    deletePost: (post) => dispatch(deleteExistingPost(post)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Post));
