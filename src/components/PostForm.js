import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
    };
  }

  componentDidMount() {
    const { match, location, user, categories } = this.props
    console.log("pppppppp", this.props);
    const { title, body, category, author } = this.state;
    match.path === '/Edit Post' && (
      this.setState(() => (
          {
            title: location.state.post.title,
            body: location.state.post.body,
            author: user.userName,
            category: location.state.post.category,
          }
        )))
    match.path === '/Add Post' && (
      this.setState(() => ({title, body, category: categories[0].name, author: user.userName})))
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

  validate = () => {
    const { title, body, author, category } = this.state;
    return title !== '' && body !== '' && author !== '' && category !== '' ;
  };

  redirectBack = () => {
    const { history } = this.props;
    setTimeout(() => {
      history.goBack();
    }, 200)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, location, addPost, editPost, posts } = this.props;
    const { title, body, author, category } = this.state;
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

  render() {
    console.log("iiiii", this.state)
    const { location, categories } = this.props;

    let inputButton = null;
    if (location.state !== undefined) {
      inputButton = <input type="submit" value="Edit Post" />;
    } else {
      inputButton = <input type="submit" value="Add Post" />;
    }
    return (
      <div>
        <Link to={{ pathname: '/' }}>Close</Link>
        <form onSubmit={this.handleSubmit} >
          <div className='create-post-details'>
            <label>
              Post Title:
              <input type="text" name='title' placeholder='Post Title'
                     value={this.state.title}
                     onChange={this.handleTitleChange}
              />
            </label>
            <label>
              Description:
              <textarea type="text" name='body' placeholder='Enter your post here'
                        value={this.state.body}
                        onChange={this.handleBodyChange}
              />
            </label>
            <label>
              Pick your category:
              <select value={this.state.category} onChange={this.handleCategoryChange}>
                {
                  categories.map((category) => (
                    <option key={category.path} value={category.path}>{category.name}</option>
                  ))
                }
              </select>
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
