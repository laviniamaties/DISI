import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LoginPage from './Pages/LoginPage/login-page';
import TeacherHomePage from './Pages/TeacherHomePage/teacher-home.page';
import StudentHomePage from './Pages/StudentHomePage/student-home.page';
import SecretaryHomePage from './Pages/SecretaryHomePage/secretary-home.page';
import Header from './Components/Header';
import { Switch } from 'react-router';
import AuthService from './Services/auth-service';

class App extends Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount(){
    AuthService.isLoggedIn().subscribe((res) => {
        console.log(res);
        this.setState({
          isLoggedIn: res
      })
    }); 
  }

  public render(): any {
    return (
      <Router>
        <div className="app">
          {
            this.state.isLoggedIn ? <Header /> : <div></div>
          }
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/teachers/" component={TeacherHomePage} />
            <Route path="/students/" component={StudentHomePage} />
            <Route path="/secretary/" component={SecretaryHomePage} />
            <Route path="/header/" component={Header} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
