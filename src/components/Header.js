import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  toggleActiveElement = (e) => {
    e.preventDefault();
    let activeElement = document.getElementsByClassName('nav-item nav-link active')[0];
    activeElement !== undefined && activeElement.classList.remove('active');
    e.target.parentElement.classList.toggle("active");
  }

  render() {
    const { categories } = this.props;
    const categoriesList =
      categories.map((category, i) => (
        <Link to={`/${category.path}`} className="nav-item nav-link" key={i}>
          <div name={category.path} >{category.name}</div>
        </Link>
      ))
    return (
      <div>
        <nav className="fixed-top navbar navbar-expand navbar-dark bg-dark flex-column flex-md-row bd-navbar"
              style={{'backgroundColor': '#37474f !important'}}
              onClick={this.toggleActiveElement}>
          <div className="navbar-nav mr-auto">
            <Link className="navbar-brand" to="#">READABLES</Link>
            <Link to={`/`} className="nav-item nav-link active">
              <div name='/'><i className="fa fa-home"></i> HOME</div>
            </Link>
            { categoriesList }
          </div>
        </nav>
        <br/>
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
