import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { actions as authActions } from '../../redux/modules/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { email, password } = this.state;
    this.props.checkEmail(email);
    this.props.checkPassword(password);
    if (email.length > 0 && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && password.length >= 6){
      this.props.login(email, password);
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { emailRedirectTo, passwordDirectTo, authDirectTo, emailWarningMessage, 
            passwordWarningMessage, authError} = this.props;
    if (emailRedirectTo && passwordDirectTo && authDirectTo) {
      return <Redirect to={from} />;
    }
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <div className="loginTitle">Log in</div>
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
        { emailWarningMessage && <Alert variant='danger'>{emailWarningMessage}</Alert> }
        { passwordWarningMessage && <Alert variant='danger'>{passwordWarningMessage}</Alert> }
        { authError && <Alert variant='danger'>{authError}</Alert> }
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    emailWarningMessage: state.auth.emailWarningMessage,
    passwordWarningMessage: state.auth.passwordWarningMessage,
    authDirectTo: state.auth.authDirectTo,
    emailRedirectTo: state.auth.emailRedirectTo,
    passwordDirectTo: state.auth.passwordDirectTo,
    userName: state.firebase.profile.userName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);