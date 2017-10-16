import React, { Component } from 'react';
import { connect } from 'react-redux';
import sortBy from 'sort-by';
import Post from './Post'
// import { sortPosts } from '../actions/posts';

class PostList extends Component {
  state = {
    sorting: 'voteScore',
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

    console.log("PostList PROPS: ", this.props);
    console.log("PostList STATE: ", this.state);

    const { posts, categorySelected } = this.props;
    const { sorting } = this.state;

    sorting === SORT_POST_BY_VOTE ? posts.sort(sortBy('-voteScore', 'title'))
                                  : posts.sort(sortBy('-timeStamp', 'title'))

    return (
      <div>
        <br/>
        <div onClick={(e) => {this.handleSorting(e)}}>sort by: <a id="sortPostVote"># of Votes</a> |
                                                               <a id="sortPostDate">Post Date</a></div>
        {categorySelected === '' && (
          posts.map((post, i) => (
            <Post
              key={post.id}
              post={post}
            />
          ))
        )}
        {categorySelected !== '' && (
          posts.filter((post) => categorySelected === post.category)
            .map((post) => (
              <Post
                key={post.id}
                post={post}
              />
            ))
        )}

        React - Readable UNDER CONSTRUCTION
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.postReducer.posts,
    categories: state.categoryReducer.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //sortingPosts: (ev) => dispatch(sortPosts(ev)),
  }
}

export default connect(mapStateToProps)(PostList);