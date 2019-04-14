import React, { Component } from 'react';
import LoginForm from '../../Components/login-form';

class LoginPage extends Component {
  public render(): any {
    return(
      <div className="app text-center">
        <h1>Some kind of SINU</h1>
        <LoginForm />
      </div>
    )
  }
}

export default LoginPage;
