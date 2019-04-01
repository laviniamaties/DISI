import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm';

class LoginPage extends Component {
  public render(): any { 
    return(
      <div className="app">
        <h1>Welcome</h1>
        <LoginForm />
    
      </div>
    )
  }
}

export default LoginPage;
