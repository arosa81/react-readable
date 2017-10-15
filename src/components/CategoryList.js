import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryList extends Component {
  render () {
    console.log("CATEGORY LIST PROPS: ", this.props);
    const { categories } = this.props;
    return (
      <div>
        Categories: 
        {categories.map((category, i) => (
          <div style={{display: 'inline-block'}} key={i}>
            <button>{category.name}</button>
          </div>
        ))}
        <br/>
      </div>
    )
  }
}

export default CategoryList;
