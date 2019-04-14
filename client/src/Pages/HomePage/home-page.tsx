
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';

export default class HomePage extends Component {

    public render(): any {       
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }
        return (
            <div >
                Home component
            </div>
        )
    }
}
