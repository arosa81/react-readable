import React, { Component} from 'react';
import { connect } from 'react-redux';
import { likePost, dislikePost } from '../actions/posts';

class Post extends Component {
  state = {
    post: {}
  }

  handleVote = (e) => {
    const { post } = this.props;

    e.preventDefault();
    console.log(e.target.id);
    if (e.target.id === 'LIKE') {
      this.props.voteLikePost(post.id)
      console.log("INSIDE LIKE handleVote");
    }
    else if (e.target.id === 'DISLIKE') {
      this.props.voteDislikePost(post.id)
    }
  }

  render() {
    const { post } = this.props;
    console.log("Post PROPS: ", this.props);
    console.log("Post STATE: ", this.state);

    const LIKE = 'LIKE';
    const DISLIKE = 'DISLIKE';
    return (
      <div>
        <br/>
        <div>`Title: ${post.title}`</div>
        <div>`Description: ${post.body}`</div>
        <div>`Author: ${post.author}`</div>
        <div>`Category: ${post.category}`</div>
        <div>`Vote Score: ${post.voteScore}`</div>
        <div style={{display: 'inline-block'}} onClick={(e) => {this.handleVote(e)}}>
          <button id={LIKE}>LIKE</button>
          <button id={DISLIKE}>DISLIKE</button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteLikePost: (post) => dispatch(likePost(post)),
    voteDislikePost: (post) => dispatch(dislikePost(post)),
  }
}

export default connect(null, mapDispatchToProps)(Post);
