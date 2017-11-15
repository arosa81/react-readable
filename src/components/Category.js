import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import sortBy from 'sort-by';
import Post from './Post';
import CategoryList from './CategoryList';
import { fetchPosts } from '../actions/posts';


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: '-voteScore',
    }
  }

  sortByDefault = () => {
    this.state.sorting === 'voteScore' && (
      this.setState(() => ({ sorting: 'voteScore' }))
    )
  }

  sortByDate = () => {
    this.setState(() => ({ sorting: 'postDate' }));
    this.props.posts.sort(sortBy('-timestamp', 'title'));
  }

  handleSorting = (e) => {
    this.setState({ sorting: e.target.id })
  }

  componentDidMount() {
    this.setState({ sorting: '-voteScore' });
  }

  render() {
    const { posts, categories, match } = this.props;
    console.log("oooooo", this.state);
    const { sorting } = this.state;
    let showingPostList;
    if (match.path === '/') {
        showingPostList = posts;
    } else if (match.params.categoryPath !== undefined) {
      showingPostList = posts.filter((p) => p.category === match.params.categoryPath);
    }
    showingPostList.sort(sortBy(sorting, 'title'))
    return (
      <div>
        <div onClick={(e) => {this.handleSorting(e)}}>
          sort by: <button id="-voteScore"># of Votes</button> | <button id="-timestamp">Post Date</button>
        </div>
        <div style={{display: 'inline-block'}}>
          <Link to={`/Add Post`}>
            <button name='createPost'>New Post</button>
          </Link>
        </div>
        <div>
            <h2 className="category-title-content">{match.params.categoryPath}</h2>
            {showingPostList.map((post) => (
                                <Post key={post.id} post={post} />
                              ))}
          </div>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    posts: state.postReducer.posts,
    categories: state.categoryReducer.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryPosts: () => dispatch(fetchPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
