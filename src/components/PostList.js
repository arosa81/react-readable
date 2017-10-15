import React, { Component } from 'react';
import { connect } from 'react-redux';
import sortBy from 'sort-by';
// import { sortPosts } from '../actions/posts';

class PostList extends Component {
  state = {
    sorting: 'voteScore',
  }

  componentDidMount() {

  }

  handleSorting = (e) => {
    const SORT_POST_BY_DATE = 'postDate';
    const SORT_POST_BY_VOTE = 'voteScore';
    e.preventDefault();
    if (e.target.id === 'sortPostDate') {
      this.setState(() => ({ sorting: SORT_POST_BY_DATE }))
      this.props.posts.sort(sortBy('-voteScore', 'title'))
    }
    else if (e.target.id === 'sortPostVote') {
      this.setState(() => ({ sorting: SORT_POST_BY_VOTE }))
      this.props.posts.sort(sortBy('-timeStamp', 'title'))
    }
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);

    const { posts } = this.props;
    const { sorting } = this.state;

    posts.sort(sortBy(sorting));

    return (
      <div>
        <div onClick={(e) => {this.handleSorting(e)}}>sort by: <a id="sortPostVote"># of Votes</a> | <a id="sortPostDate">Post Date</a></div>
        {this.props.posts.map((post, i) => (
          <div key={i}>
            <div>`Title: ${post.title}`</div>
            <div>`Description: ${post.body}`</div>
            <div>`Author: ${post.author}`</div>
            <div>`Category: ${post.category}`</div>
            <div>`Vote Score: ${post.voteScore}`</div>
            <br/>
          </div>
        ))}

        React - Readable UNDER CONSTRUCTION
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log("mapStateToProps, ", state.postReducer.posts);
  // console.log("mapStateToCategories, ", state.categoryReducer.categories);
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
