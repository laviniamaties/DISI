
import React, { PureComponent } from 'react';
import AuthService from '../../Services/auth-service';
import { Redirect } from 'react-router';

interface ITeacherHomePageState {

}

interface ITeacherHomePageProps {

}
export default class TeacherHomePage extends PureComponent<ITeacherHomePageState, ITeacherHomePageProps> {
    constructor(props: ITeacherHomePageProps) {
        super(props);
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }
        return (
            <div className='divWrapper'>
                This is teacher home page
            </div>
        )
    }

    private func = () => {

    }
}
