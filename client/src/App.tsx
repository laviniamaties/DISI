import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LoginPage from './Pages/LoginPage/login-page';
import TeacherHomePage from './Pages/TeacherHomePage/teacher-home.page';
import StudentHomePage from './Pages/StudentHomePage/student-home.page';
import SecretaryHomePage from './Pages/SecretaryHomePage/secretary-home.page';
import Header from './Components/Header';
import { Switch } from 'react-router';
import AuthService from './Services/auth-service';
import BaseComponent from './BaseComponent';
import HomePage from './Pages/HomePage/home-page';
import GradesPage from './Pages/GradesPage/grades-page';

class App extends BaseComponent {
  public render(): any {
    return (
      <Router>
        <div className="app">
          {
            this.state.isLoggedIn ? <Header /> : <div></div>
          }
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/teacher/" component={TeacherHomePage} />
            <Route path="/student/" component={StudentHomePage} />
            <Route path="/secretary/" component={SecretaryHomePage} />
            <Route path="/grades/" component={GradesPage} />
            <Route path="/header/" component={Header} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
