import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { submitUser } from '../actions/user';

import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class UserNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      formError: '',
    }
  }

  handleUserNameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  handleFormErrorChange = (value) => {
    this.setState({formError: value})
  }

  redirectHome = () => {
    const { history } = this.props;
    console.log("REDIRECTING HOME");
    setTimeout(() => {
      this.state.formError === 'false' && history.push('/');
    }, 200)
  }

  validate = (e) => {
    let form = document.getElementById('userNameForm');
    if (form.checkValidity() === false) {
      this.handleFormErrorChange('true');
      e.preventDefault();
      e.stopPropagation();
    } else {
    this.handleFormErrorChange('false');
    }
    form.classList.add('was-validated');
  }

  handleSubmit = (e) => {
    const { addUser } = this.props;
    e.preventDefault();
    this.validate(e);
    addUser(this.state.userName);
    this.redirectHome();
  }

  render() {
    const { user } = this.props;
    console.log("USER PROPPPPS", this.props);
    console.log("USER STATE", this.state);
    return (
      <form id="userNameForm" onSubmit={this.handleSubmit} noValidate>
        <h4 className="alert alert-info">
          Enter a user name that you would like to use throughout the app.
        </h4>
        <br/>
        <div>
          <label>User Name:</label>
          <input required type="text" className="form-control" id='userNameInput'
                 placeholder='Enter a user name'
                 value={this.state.userName}
                 onChange={this.handleUserNameChange}
          />
          <p className="invalid-feedback"> Please provide a username.</p><br/>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: (user) => dispatch(submitUser(user)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(UserNameForm));
