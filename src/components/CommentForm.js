import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewComment, editExistingComment } from '../actions/comments'

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      author: '',
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match, location } = this.props
    console.log("pppppppp", this.props);
    const { body, author } = this.state;
    match.path === '/Edit Comment' && (
      this.setState(() => (
          {
            body: location.state.comment.body,
            author: location.state.comment.author,
          }
        )))
    match.path === '/Add Comment' && (
      this.setState(() => ({ body, author })))
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value });
  }

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  }

  validate = () => {
    const { body, author } = this.state;
    return body !== '' && author !== '' ;
  };

  redirectBack = () => {
    const { history } = this.props;
    setTimeout(() => {
      history.goBack();
    }, 200)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, location, addComment, editComment, categories, comments } = this.props;
    const { body, author } = this.state;
    if (location.state !== undefined) {
      editComment({
            id: location.state.comment.id,
            body,
            author,
          });
      this.redirectBack();
    } else {
      addComment({
            ...this.state,
          }).then((comment) => ({
            comments: comments.concat([comment])
          }));
      this.handleRedirect();
    }
  }

  render() {
    console.log("iiiii", this.state)
    const { categories } = this.props;

    return (
      <div>
        <Link to={{ pathname: '/', state: { sorting: 'voteScore' } }}>Close</Link>
        <form onSubmit={this.handleSubmit} >
          <div>
            <label>
              Description:
              <textarea type="text" name='body' placeholder='Enter your comment here'
                        value={this.state.body}
                        onChange={this.handleBodyChange}
              />
            </label>
            <label>
              Author:
              <input type="text" value={this.state.author} onChange={this.handleAuthorChange} />
            </label>
            <input type="submit" value="Add Post" />
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    categories: state.categoryReducer.categories,
    posts: state.postReducer.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addNewComment(comment)),
    editComment: (comment) => dispatch(editExistingComment(comment)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
