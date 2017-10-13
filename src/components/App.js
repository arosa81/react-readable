import React, { Component } from 'react';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { fetchCategories } from '../actions/categories';

class App extends Component {

  componentDidMount() {
    this.props.queryPosts()
      .then(() => console.log("at componentDidMount: ", this.state))
    this.props.queryCategories()
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
  console.log("mapStateToCategories, ", state.categoryReducer.categories);
  return {
    posts: state.postReducer.posts,
    categories: state.categoryReducer.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryPosts: () => dispatch(fetchPosts()),
    queryCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
