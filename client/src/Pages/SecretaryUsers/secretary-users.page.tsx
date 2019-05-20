import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import AuthService from '../../Services/auth-service';
import LoginForm from '../../Components/login-form';

interface ISecretaryUsersState {

}

interface ISecretaryUsersProps {

}
export default class SecretaryUsersPage extends PureComponent<ISecretaryUsersProps, ISecretaryUsersState> {
    constructor(props: ISecretaryUsersProps) {
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
