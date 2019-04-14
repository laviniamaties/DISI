import './secretary-styles.css';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';

interface ISecretaryHomePageProps {

}

interface ISecretaryHomePageState {

}
export default class SecretaryHomePage extends PureComponent<ISecretaryHomePageState, ISecretaryHomePageProps> {
    constructor(props: ISecretaryHomePageProps) {
        super(props);
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }
        return (
            <div className='divWrapper'>
                This is secretary home page
            </div>
        )
    }

    private func = () => {

    }
}
