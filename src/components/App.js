import React, { Component } from 'react';
import * as api from '../utils/api';

class App extends Component {
  render() {
    api.getAllPosts();
    api.getPost('8xf0y6ziyjabvozdd253nd');

    return (
      <div>
        React - Readable UNDER CONSTRUCTION
      </div>
    )
  }
}

export default App;
