import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import sortBy from 'sort-by';
import Post from './Post';
import CategoryList from './CategoryList';

class Category extends Component {
  state = {
    sorting: 'voteScore',
    modalOpen: false
  }

  handleSorting = (e) => {
    const SORT_POST_BY_DATE = 'postDate';
    const SORT_POST_BY_VOTE = 'voteScore';
    e.preventDefault();
    if (e.target.id === 'sortPostDate') {
      this.setState(() => ({ sorting: SORT_POST_BY_DATE }))
    }
    else if (e.target.id === 'sortPostVote') {
      this.setState(() => ({ sorting: SORT_POST_BY_VOTE }))
    }
  }

  render() {
    const SORT_POST_BY_VOTE = 'voteScore';
    const { posts, categories, match } = this.props;
    console.log("kkkkkkk: ", match);
    const { sorting, modalOpen } = this.state;
    const defaultPostList = match.path === '/' && (
                      <div>
                      <h2 className="category-title-content">ALL</h2>
                      {posts.map((post) => (
                        <Post
                          key={post.id}
                          post={post}
                        />
                      ))}</div>
                    )
    const filteredPostList = match.params.categoryPath !== undefined && (
      <div>
        <h2 className="category-title-content">{match.params.categoryPath}</h2>
        {posts.filter((p) => p.category === match.params.categoryPath)
              .map((post) => (
                <Post
                  key={post.id}
                  post={post}
                />
              ))}</div>
    )

    sorting === SORT_POST_BY_VOTE ? posts.sort(sortBy('-voteScore', 'title'))
                                  : posts.sort(sortBy('-timeStamp', 'title'))

    return (
      <div>
        <div onClick={(e) => {this.handleSorting(e)}}>sort by: <a id="sortPostVote"># of Votes</a> |
                                                               <a id="sortPostDate">Post Date</a></div>
        <div style={{display: 'inline-block'}}>
          <Link
            to={`/create`}
          >
            <button name='createPost'>New Post</button>
          </Link>
        </div>
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


export default withRouter(connect(mapStateToProps, null)(Category));
