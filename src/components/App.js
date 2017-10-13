import React, { Component } from 'react';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';

class App extends Component {

  componentDidMount() {
    this.props.queryPosts()
      .then(() => console.log("at componentDidMount: ", this.state))
  }

  render() {
    const { posts } = this.props;
    {console.log("render posts: ", posts);}
    return (
      <div>
      {posts.map((post, i) => (
        <div key={i}>
          <div>`Title: ${post.title}`</div>
          <div>`Description: ${post.body}`</div>
          <div>`Author: ${post.author}`</div>
          <div>`Category: ${post.category}`</div>
          <div>`Vote Score: ${post.voteScore}`</div>
          <br/>
        </div>
      ))}

        React - Readable UNDER CONSTRUCTION
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps, ", state.postReducer.posts);
  return {
    posts: state.postReducer.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
