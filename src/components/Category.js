import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import sortBy from 'sort-by';
import Post from './Post';
import { fetchPosts } from '../actions/posts';
import NoItem from './NoItem';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: '',
    }
  }

  handleSorting = (e) => {
    this.setState({ sorting: e.target.id })
  }

  componentDidMount() {
    this.setState({ sorting: '-voteScore' });
  }

  render() {
    const { posts, categories, match } = this.props;
    const { sorting } = this.state;
    let showingPostList;
    if (match.path === '/') {
      showingPostList = posts;
    } else if (match.params.categoryPath !== undefined) {
      showingPostList = posts.filter((p) => p.category === match.params.categoryPath);
    } else {
      return (<NoItem />)
    }
    showingPostList.sort(sortBy(sorting, 'title'))
    return (
      <div>
        <h2>{match.params.categoryPath}</h2>
        <div className="btn-toolbar justify-content-between">
          <Link to={{ pathname: `/Add Post`, state: { fromCategory: match.params.categoryPath } }}>
            <button className="btn btn-success btn-sm" name='createPost'>
              <i className="fa fa-plus" aria-hidden="true"></i> New Post</button>
          </Link>
          <div className="btn-group btn-group-sm" onClick={(e) => {this.handleSorting(e)}}>
            <p>
              <i className="fa fa-sort" aria-hidden="true"></i> Sort By:
              <a className="btn btn-secondary btn-sm" href="#" id="-voteScore">
                <i className="fa fa-sort-numeric-desc" title="Align Left"></i> Votes
              </a>
              <a className="btn btn-secondary btn-sm" href="#" id="-timestamp">
                <i className="fa fa-sort-amount-desc" title="Align Right"></i> Date
              </a>
            </p>
          </div>
        </div>
        <div>
            {showingPostList.map((post) => (
                                <Post key={post.id} post={post} />
                              ))}
          </div>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  const category = state.categoryReducer.categories.find((category) => category.path === match.params.categoryPath) || null;
  const filteredPosts = state.postReducer.posts.filter((post) => post.category === match.params.categoryPath)
  return {
    posts: state.postReducer.posts,
    categories: state.categoryReducer.categories,
    category: category,
    user: state.userReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryPosts: () => dispatch(fetchPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
