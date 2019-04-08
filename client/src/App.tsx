import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LoginPage from './Pages/LoginPage/login-page';
import TeacherHomePage from './Pages/TeacherHomePage/teacher-home.page';
import StudentHomePage from './Pages/StudentHomePage/student-home.page';
import SecretaryHomePage from './Pages/SecretaryHomePage/secretary-home.page';

class App extends Component {
  public render(): any {
    return(
      <Router>
        <Route path="/" exact component={LoginPage} />
        <Route path="/teacher/" component={TeacherHomePage} />
        <Route path="/student/" component={StudentHomePage} />
        <Route path="/secretary/" component={SecretaryHomePage} />
      </Router>
    )
  }
}

export default App;
