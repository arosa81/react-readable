import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { submitUser } from '../actions/user';


class UserNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    }
  }

  handleUserNameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  redirectHome = () => {
    const { history } = this.props;
    setTimeout(() => {
      history.push('/');
    }, 200)
  }

  handleSubmit = (e) => {
    const { addUser } = this.props;
    e.preventDefault();
    console.log("SUBMIT USER: " + this.state.userName);
    addUser({ userName: this.state.userName });
    this.redirectHome();
  }

  render() {
    const { user } = this.props;
    console.log("USER PROPPPPS", this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <h4>
            Enter a user name that you would like to use throughout the app.
          </h4>
          <div>
            <label>
              User Name:
              <input required type="text" name='userNameInput' placeholder='Enter a user name'
                     value={this.state.userName}
                     onChange={this.handleUserNameChange}
              />
            </label>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: (user) => dispatch(submitUser(user)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(UserNameForm));
