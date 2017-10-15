import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryList extends Component {
  render () {
    console.log("CATEGORY LIST PROPS: ", this.props);
    return (
      <div>
        --CategoryList--
      </div>
    )
  }
}

export default CategoryList;
