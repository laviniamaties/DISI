import React, { Component } from 'react'
import AuthService from './Services/auth-service';

class BaseComponent extends Component {
    state = {
        isLoggedIn: false
    };

    componentDidMount(){
        AuthService.isLoggedIn().subscribe((res) => {
            console.log(res);
            this.setState({
              isLoggedIn: res
          });
        }); 
      }
}

export default BaseComponent;
