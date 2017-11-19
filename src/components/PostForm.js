import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPost, editExistingPost } from '../actions/posts'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      category: '',
      formError: '',
    };
  }

  componentDidMount() {
    const { match, location, user, categories } = this.props
    const { title, body, category, author } = this.state;
    match.path === '/Edit Post' && (
      this.setState(() => (
          {
            title: location.state.post.title,
            body: location.state.post.body,
            author: user,
            category: location.state.post.category,
          }
        )))
    match.path === '/Add Post' && (
      this.setState(() => ({title, body, category: categories[0].name, author: user})))
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value });
  }

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  }

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  }

  handleFormErrorChange = (value) => {
    this.setState({formError: value})
  }

  validate = (e) => {
    const { location, addPost, editPost, posts } = this.props;
    const { title, body, category } = this.state;

    let form = document.getElementById('PostForm');
    if (form.checkValidity() === false) {
      this.handleFormErrorChange('true');
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.handleFormErrorChange('false');
      if (location.state !== undefined) {
          editPost({
            id: location.state.post.id,
            title,
            body,
            category,
          });
          this.redirectBack();
      } else {
          addPost({
                ...this.state,
              }).then((post) => ({
                posts: posts.concat([post])
              }));
          this.redirectBack();
        }
    }
    form.classList.add('was-validated');
  }

  redirectBack = () => {
    const { history } = this.props;
    setTimeout(() => {
      history.goBack();
    }, 200)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.validate(e);
  }

  render() {
    const { location, categories } = this.props;

    let inputButton = null;
    if (location.state !== undefined) {
      inputButton = <input id="editPostInput" className="btn btn-primary" type="submit" value="Edit Post" />;
    } else {
      inputButton = <input id="addPostInput" className="btn btn-primary" type="submit" value="Add Post" />;
    }
    return (
      <div>
        <form id="PostForm" onSubmit={this.handleSubmit} noValidate>
          <a className="text-danger" onClick={() => { this.redirectBack() }}>
            <i className="fa fa-window-close fa-lg" aria-hidden="true"></i>
          </a>
          <div className='form-group'>
            <label htmlFor="titleInput">Post Title:</label>
            <input required type="text" className="form-control" id='titleInput'
                   placeholder='Post Title'
                   value={this.state.title}
                   onChange={this.handleTitleChange}
            />
            <p className="invalid-feedback"> Please provide a title.</p>
          </div>
          <div className='form-group'>
            <label htmlFor="bodytarea">Description:</label>
            <textarea required type="text" className="form-control" id='bodytarea'
                      placeholder='Enter your post here'
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
          <div className='form-group'>
            <label htmlFor="categorySelect">Pick your category:</label>
            <select className="form-control"
                    id="categorySelect"
                    value={this.state.category}
                    onChange={this.handleCategoryChange}>
              {
                categories.map((category) => (
                  <option key={category.path} value={category.path}>{category.name}</option>
                ))
              }
            </select>
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
    posts: state.postReducer.posts,
    user: state.userReducer.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(addNewPost(post)),
    editPost: (post) => dispatch(editExistingPost(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
