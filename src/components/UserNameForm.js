import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { submitUser } from '../actions/user';

class UserNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      invalidUserName: false,
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
    const { submitUser } = this.props;
    const { userName, invalidUserName } = this.state;
    e.preventDefault();
    switch (userName.length) {
      case -1:
      case 0:
        this.setState({ invalidUserName: true });
        break;
      default:
        this.setState({ invalidUserName: false });
    }

    if (userName !== '') {
      submitUser(userName);
      this.redirectHome();
    }
  }

  render() {
    const { userName, invalidUserName } = this.state;
    console.log("USERNAME: ", this.props, this.state);

    return (
      <div>
        <h4 className="alert alert-info">
          Enter a user name that you would like to use throughout the app.
        </h4>
        <form id="userNameForm" onSubmit={this.handleSubmit} noValidate>
          <div>
            <TextField required type="text"
              floatingLabelText="Enter a user name"
              errorText={invalidUserName === false ? '' : 'Please provide a username'}
              id='userNameInput'
              value={userName}
              onChange={this.handleUserNameChange}
              />
          </div>
          <RaisedButton label="Submit" type="submit" primary={true} />
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, { submitUser })(UserNameForm));
