import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      category: '',
      author: '',
    }
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
    return (
      <div>
        <Link to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} >
          <div className='create-post-details'>
            <input type="text" name='title' placeholder='Post Title'/>
            <input type="text" name='body' placeholder='Enter your post here'/>
            <button>Add Post</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(PostForm);
