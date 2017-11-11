import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Category from './Category';

class CategoryList extends Component {

  render () {
    const { categories } = this.props;
    return (
      <div>
          <Category />
        <br/>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  console.log(match);
  return {
    categories: state.categoryReducer.categories,
    category: state.categoryReducer.categories.filter((category) => category.path === match.params.path),
    categoryPath: match.params.path || '/',
  };
}

export default withRouter(connect(mapStateToProps, null)(CategoryList));
