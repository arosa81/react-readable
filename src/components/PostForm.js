import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    category: '',
    author: '',
  }

  componentDidMount() {
    console.log("ddddddddd", this.state);
    const { title, body, category, author } = this.state;
    this.setState({title, body, category, author});
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

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(PostForm);
