import React, { Component } from 'react';
import LoginForm from '../../Components/login-form';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';

class LoginPage extends Component {
  public render(): any {
    let isAuth = AuthService.isAuth();
    if (isAuth) {
        return <Redirect to='/' />;
    }
    return(
      <div className="app text-center">
        <h1>Some kind of SINU</h1>
        <LoginForm />
      </div>
    )
  }
}

export default LoginPage;
