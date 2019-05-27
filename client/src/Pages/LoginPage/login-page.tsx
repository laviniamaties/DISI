import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';
import LoginForm from '../../Components/login-form';

class LoginPage extends Component {
  public render(): any {
    let isAuth = AuthService.isAuth();
    if (isAuth) {
        const authenticatedUser = AuthService.getAuthenticatedUser();
        const pathToRedirect = authenticatedUser.role === 0 ? '/student' : authenticatedUser.role === 1 ? '/teacher' : authenticatedUser.role === 2 ? '/secretary' : '';
        return <Redirect to={pathToRedirect} />;
    }

    return(
      <div className="app text-center">
        <h1>Some kind of SINU</h1>
        <LoginForm isLoginForm={true}/>
      </div>
    )
  }
}

export default LoginPage;
