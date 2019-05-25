import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import AuthService from '../../Services/auth-service';
import LoginForm from '../../Components/login-form';

export default class SecretaryUsersPage extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }

        return (
            <div className='divWrapper'>
                <LoginForm isLoginForm={false} />
            </div>
        )
    }

    private func = () => {

    }
}
