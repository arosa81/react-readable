import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostList from './PostList';

class CategoryList extends Component {
  state = {
    categorySelected: ''
  }

  handleCategorySelected = (e) => {
    e.preventDefault();
    this.setState({ categorySelected: e.target.name });
    console.log("handleCategorySelected: ", this.state.categorySelected);
  }

  render () {
    const { categories } = this.props;
    return (
      <div>
        Categories:
          <div style={{display: 'inline-block'}} onClick={(e) => {this.handleCategorySelected(e)}}>
            <Link
              to='/'
            >
              <button name=''>ALL</button>
            </Link>
            {categories.map((category, i) => (
              <Link
                to={`/${category.path}`}
                key={i}
              >
                <button name={category.path} value={category.name}>{category.name}</button>
              </Link>
              ))}
          </div>
        <br/>
        <PostList
          categorySelected={this.state.categorySelected}
        />
      </div>
    )
  }
}

export default CategoryList;
