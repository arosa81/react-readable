import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPost } from '../actions/posts'

let uid = require('rand-token').uid;

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      category: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match, location } = this.props
    console.log("pppppppp", this.props);
    const { title, body, category, author } = this.state;
    match.path === '/edit' && (
      this.setState(() => (
          {
            title: location.state.post.title,
            body: location.state.post.body,
            author: location.state.post.author,
            category: location.state.post.category,
          }
        )))
    match.path === '/create' && (
      this.setState(() => ({title, body, category, author})))
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value });
  }

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = ''//serializeForm(e.target, { hash: true });
    console.log(values);
    // if (this.props.onCreateContact) {
    //   this.props.onCreateContact(values);
    // }
    const { location, addPost } = this.props
    const { title, body, category, author } = this.state;
    location.state !== undefined
      ? console.log('whatever')
      : ( addPost({
            id: uid(16),
            timeStamp: Date.now(),
            ...this.state,
          }))
  }
  render() {
    console.log("iiiii", this.state)
    const { categories } = this.props;
    return (
      <div>
        <Link to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} >
          <div className='create-post-details'>
            <input
              type="text"
              name='title'
              placeholder='Post Title'
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            <textarea
              type="text"
              name='body'
              placeholder='Enter your post here'
              value={this.state.body}
              onChange={this.handleBodyChange}
            />
            <label>
              Pick your category:
              <select value={this.state.category} onChange={this.handleCategoryChange}>
                {
                  categories.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))
                }
              </select>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(addNewPost(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
