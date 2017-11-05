import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPost } from '../actions/posts'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      category: '',
      author: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
    const { location } = this.props
    const { title, body, category, author } = this.state;
    location.state !== undefined
      ? this.setState(() => (
          {
            title: location.state.post.title,
            body: location.state.post.body,
            category: location.state.post.category,
            author: location.state.post.author
          }
        ))
      : this.setState(() => ({title, body, category, author}))
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

function mapStateToProps(state) {
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
