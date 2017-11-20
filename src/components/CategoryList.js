import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Category from './Category';

class CategoryList extends Component {

  render() {
    const { categoryPath, user } = this.props;
    return (
      <div>
        {categoryPath === 'ALL Posts' && (
          <div>
            <h2 className="category-title-content">All Posts</h2>
            <Category categoryPath={categoryPath}/>
          </div>
        )}
        {user === '' && <Redirect to='/addusername' />}
        <br/>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    categoryPath: match.params.path || 'ALL Posts',
    user: state.userReducer.user,
  };
}

export default withRouter(connect(mapStateToProps, null)(CategoryList));
