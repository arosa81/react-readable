import React, { Component } from 'react';
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
    const { match, location, user } = this.props
    console.log("pppppppp", this.props);
    const { body, author } = this.state;
    match.path === '/Edit Comment' && (
      this.setState(() => (
          {
            body: location.state.comment.body,
            author: user.userName,
          }
        )))
    match.path === '/Add Comment' && (
      this.setState(() => ({ body, author: user.userName })))
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
    const { location, addComment, editComment, comments } = this.props;
    const { body, author } = this.state;
    if (location.state.comment !== undefined) {
      editComment({
            id: location.state.comment.id,
            body,
            parentId: location.state.post.id,
          });
      this.redirectBack();
    } else {
      addComment({
            ...this.state,
            parentId: location.state.post.id,
          });
      this.redirectBack();
    }
  }

  render() {
    console.log("ccccccccc", this.props)
    const { categories, location } = this.props;
    let inputButton = null;
    if (location.state.comment !== undefined) {
      inputButton = <input type="submit" value="Edit Comment" />;
    } else {
      inputButton = <input type="submit" value="Add Comment" />;
    }
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
            {inputButton}
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    categories: state.categoryReducer.categories,
    comments: state.categoryReducer.comments || [],
    user: state.userReducer.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addNewComment(comment)),
    editComment: (comment) => dispatch(editExistingComment(comment)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
