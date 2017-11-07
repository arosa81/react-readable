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
      sorting: '',
    }
  }

  handleSorting = (e) => {
    const SORT_POST_BY_DATE = 'postDate';
    const SORT_POST_BY_VOTE = 'voteScore';
    const { posts } = this.props;
    const { sorting } = this.state;
    if (e === undefined ){
      this.setState(() => ({ sorting: SORT_POST_BY_VOTE }));
      posts.sort(sortBy('-voteScore', 'title'));
    }
    else {
      e.preventDefault();
      if (e.target.id === 'sortPostDate') {
        this.setState(() => ({ sorting: SORT_POST_BY_DATE }));
        posts.sort(sortBy('-timestamp', 'title'));
      }
      else {
        this.setState(() => ({ sorting: SORT_POST_BY_VOTE }));
        posts.sort(sortBy('-voteScore', 'title'));
      }
    }
  }

  componentDidMount() {
    this.setState({ sorting: 'voteScore' });
    this.handleSorting();
  }

  render() {
    const { posts, categories, match } = this.props;
    console.log("oooooo", this.props);
    const { sorting, modalOpen } = this.state;
    const defaultPostList = match.path === '/' && (
      <div>
        <h2 className="category-title-content">ALL</h2>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>)

    const filteredPostList = match.params.categoryPath !== undefined && (
      <div>
        <h2 className="category-title-content">{match.params.categoryPath}</h2>
        {posts.filter((p) => p.category === match.params.categoryPath)
              .map((post) => (
                <Post
                  key={post.id}
                  post={post}
                />
              ))}
      </div>)
      // sorting === 'voteScore' ? posts.sort(sortBy('-voteScore', 'title'))
      //                         : posts.sort(sortBy('-timestamp', 'title'))

    return (
      <div>
        <div onClick={(e) => {this.handleSorting(e)}}>
          sort by: <button id="sortPostVote"># of Votes</button> | <button id="sortPostDate">Post Date</button>
        </div>
        <div style={{display: 'inline-block'}}>
          <Link
            to={`/create`}
          >
            <button name='createPost'>New Post</button>
          </Link>
        </div>
        { this.handleSorting }
        { defaultPostList }
        { filteredPostList }
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
