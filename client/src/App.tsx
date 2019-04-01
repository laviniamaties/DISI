import React, { Component } from 'react';
import LoginForm from './Components/LoginForm'
import LoginPage from './Pages/LoginPage/Login.page';

class App extends Component {
  public render(): any { 
    return(
      <div className="app">
        <LoginPage />
      </div>
    )
  }
}

export default App;
