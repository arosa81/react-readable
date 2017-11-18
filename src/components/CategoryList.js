import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Category from './Category';

class CategoryList extends Component {

  render() {
    const { categoryPath, user } = this.props;
    console.log("CATEGORY LIST: ", this.props);
    return (
      <div>
        {categoryPath === '/' && (
          <h2 className="category-title-content">All Posts</h2>
        )}
        {user === '' && <Redirect to='/addusername' />}
        <Category />
        <br/>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  console.log(match);
  return {
    // categories: state.categoryReducer.categories,
    // category: state.categoryReducer.categories.filter((category) => category.path === match.params.path),
    categoryPath: match.params.path || '/',
    user: state.userReducer.user,
  };
}

export default withRouter(connect(mapStateToProps, null)(CategoryList));
