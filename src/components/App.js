import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/posts';
import { fetchCategories } from '../actions/categories';

import PostList from './PostList';
import CategoryList from './CategoryList';

class App extends Component {

  componentDidMount() {
    this.props.queryPosts()
      .then(() => console.log("at componentDidMount POSTS: ", this.props.posts))
    this.props.queryCategories()
      .then(() => console.log("at componentDidMount CATEGORIES: ", this.props.categories))
  }

  render() {
    const { posts, categories } = this.props;
    return (
      <div>
        <CategoryList categories={ categories }/>
        <PostList />
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
