import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div>
      Categories:
        <div style={{display: 'inline-block'}}>
          <Link
            to={`/`}
          >
            <button name='/'>ALL</button>
          </Link>
        </div>
          { categories.map((category, i) => (
            <div style={{display: 'inline-block'}} key={i}>
              <Link
                to={`/${category.path}`}
                >
                <button name={category.path} >{category.name}</button>
              </Link>
            </div>
        )) }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoryReducer.categories,
  };
}

export default withRouter(connect(mapStateToProps,null)(Header));
