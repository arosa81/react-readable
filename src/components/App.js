import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Link } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { fetchCategories } from '../actions/categories';

import Header from './Header';
import CategoryList from './CategoryList';
import Category from './Category';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import PostDetails from './PostDetails';


class App extends Component {
  componentDidMount() {
    console.log("lllllllllll: ", this.props)
    this.props.match.params = {
      categoryPath: 'ALL'
    }
    this.props.queryPosts();
    this.props.queryCategories();
  }

  render() {
    const { posts, categories } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <CategoryList />} />
          <Route exact path='/Add Post' render={({ match }) => (<PostForm/>)} />
          <Route exact path='/Edit Post' render={({ match }) => (<PostForm/>)} />
          <Route exact path='/Add Comment' render={({ match }) => (<CommentForm/>)} />
          <Route exact path='/Edit Comment' render={({ match }) => (<CommentForm/>)} />

          <Route exact path='/:categoryPath' render={({ match }) => <Category />} />
          {posts && (
            <Route exact path='/:categoryPath/:postID' render={({ match }) => (
              <PostDetails post={posts.find(p => p.id === match.params.postID)}/>
            )}/>
          )}
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
