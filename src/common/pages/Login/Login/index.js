import React from 'react';
import loadable from 'loadable-components';
import Login from './Login';
import './Login.css';

class LoginPage extends React.Component {
  state = {
    Component: Login
  };
  screens = {
    SignUp: loadable(() => import('../SignUp')),
    ForgotPassword: loadable(() => import('../ForgotPassword')),
    Login
  };
  switchScreen = screen => {
    this.setState({
      Component: this.screens[screen]
    });
  };
  render() {
    const { Component } = this.state;
    return <Component switchScreen={this.switchScreen} />;
  }
}

export default LoginPage;
