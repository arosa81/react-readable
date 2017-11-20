import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { fetchCategories } from '../actions/categories';

import Header from './Header';
import CategoryList from './CategoryList';
import Category from './Category';
import PostForm from './PostForm';
import UserNameForm from './UserNameForm';
import CommentForm from './CommentForm';
import PostDetails from './PostDetails';
import NoItem from './NoItem';

class App extends Component {
  componentDidMount() {
    this.props.queryPosts();
    this.props.queryCategories();
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user === undefined && <Header />}
        {user !== '' && <Header />}
        <div style={{height: '50px'}}></div>
        <div className="container">
          <div className="row justify-content-sm-center">
            <Switch>
              <Route exact path='/' render={() => <CategoryList />} />
              <Route exact path='/addusername' render={({ match }) => (<UserNameForm/>)} />
              <Route exact path='/Add Post' render={({ match }) => (<PostForm/>)} />
              <Route exact path='/Edit Post' render={({ match }) => (<PostForm/>)} />
              <Route exact path='/Add Comment' render={({ match }) => (<CommentForm/>)} />
              <Route exact path='/Edit Comment' render={({ match }) => (<CommentForm/>)} />
              <Route exact path="/noitem" render={({ match }) => (<NoItem />)} />

              <Route exact path='/:categoryPath' render={() => <Category />} />
              <Route exact path='/:categoryPath/:postID' render={({ match }) => (
                    <PostDetails postLink={`/${match.params.categoryPath}/${match.params.postID}`}/>
                )}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    posts: state.postReducer.posts,
    user: state.userReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryPosts: () => dispatch(fetchPosts()),
    queryCategories: () => dispatch(fetchCategories()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
