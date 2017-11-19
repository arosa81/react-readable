import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addNewComment, editExistingComment } from '../actions/comments'

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      author: '',
      formError: '',
    };
  }

  componentDidMount() {
    const { match, location, user } = this.props
    const { body, author } = this.state;
    match.path === '/Edit Comment' && (
      this.setState(() => (
          {
            body: location.state.comment.body,
            author: user,
          }
        )))
    match.path === '/Add Comment' && (
      this.setState(() => ({ body, author: user })))
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value });
  }

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  }

  handleFormErrorChange = (value) => {
    this.setState({formError: value})
  }

  redirectBack = () => {
    const { history } = this.props;
    setTimeout(() => {
      history.goBack();
    }, 200)
  }

  validate = (e) => {
    const { location, addComment, editComment } = this.props;
    const { body, author } = this.state;
    let form = document.getElementById('CommentForm');
    if (form.checkValidity() === false) {
      this.handleFormErrorChange('true');
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.handleFormErrorChange('false');
      if (location.state.comment !== undefined) {
        editComment({
          id: location.state.comment.id,
          body,
          parentId: location.state.comment.parentId,
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
    form.classList.add('was-validated');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { location, addComment, editComment, comments } = this.props;
    const { body, author } = this.state;
    this.validate(e);
  }

  render() {
    const { location, categories } = this.props;
    let inputButton = null;
    if (location.state.comment !== undefined) {
      inputButton = <input id="editCommentInput" className="btn btn-primary" type="submit" value="Edit Comment" />;
    } else {
      inputButton = <input id="addCommentInput" className="btn btn-primary" type="submit" value="Add Comment" />;
    }
    return (
      <div>
        <form id="CommentForm" onSubmit={this.handleSubmit} noValidate>
          <a className="text-danger" onClick={() => { this.redirectBack() }}>
            <i className="fa fa-window-close fa-lg" aria-hidden="true"></i>
          </a>
          <div className='form-group'>
            <label htmlFor="bodytarea">Description:</label>
              <textarea required type="text" className="form-control" id='bodytarea'
                        placeholder='Enter your comment here'
                        value={this.state.body}
                        onChange={this.handleBodyChange}
                        style={{
                          width: '300px',
                          height: '200px',
                          border: '1px solid #ccc',
                        }}
              />
              <p className="invalid-feedback"> Please provide some details.</p>
          </div>
          {inputButton}
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
