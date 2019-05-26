import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { actions as authActions } from '../../redux/modules/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    this.props.checkUserName(username);
    this.props.checkEmail(email);
    this.props.checkPassword(password);
    if (username.length > 0 && username.length <= 30 && email.length > 0 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && password.length >= 6){
        this.props.signup(username, email, password);
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { userNameRedirectTo, emailRedirectTo, passwordDirectTo, 
        userNameWarningMessage, emailWarningMessage, passwordWarningMessage, authError, authDirectTo } = this.props;
    if (userNameRedirectTo && emailRedirectTo && passwordDirectTo && authDirectTo) {
      return <Redirect to={from} />;
    }

    return (
      <form className="registerForm" onSubmit={this.handleSubmit}>
        <div className="registerTitle">Sign up</div>
        <div className="form-group">
          <div className='col-md-3 control-label username'>User Name：</div>
          <div className="col-md-9 userinput">
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className='col-md-3 control-label username'>Email：</div>
          <div className="col-md-9 userinput">
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {<div className="form-group">
          <div className='col-md-3 control-label username'>Password：</div>
          <div className="col-md-9 userinput">
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>}
        <div className="form-group Submit">
          <button type="submit" className="btn btn-fill btn-info buttonSize">Submit</button>
        </div>
        { userNameWarningMessage && <Alert variant='danger'>{userNameWarningMessage}</Alert> }
        { emailWarningMessage && <Alert variant='danger'>{emailWarningMessage}</Alert> }
        { passwordWarningMessage && <Alert variant='danger'>{passwordWarningMessage}</Alert> }
        { authError && <Alert variant='danger'>{authError}</Alert> }
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userNameWarningMessage: state.auth.userNameWarningMessage,
    emailWarningMessage: state.auth.emailWarningMessage,
    passwordWarningMessage: state.auth.passwordWarningMessage,
    userNameRedirectTo: state.auth.userNameRedirectTo,
    emailRedirectTo: state.auth.emailRedirectTo,
    passwordDirectTo: state.auth.passwordDirectTo,
    authError: state.auth.authError,
    authDirectTo: state.auth.authDirectTo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);