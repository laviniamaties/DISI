import './student-styles.css';
import React, { PureComponent } from 'react';
import AuthService from '../../Services/auth-service';
import { Redirect } from 'react-router';
import StudentGradesComponent from '../../Components/student-grades/student-grades.component';

interface IStudentHomePageState {

}

interface IStudentHomePageProps {

}
export default class StudentHomePage extends PureComponent<IStudentHomePageState, IStudentHomePageProps> {
    constructor(props: IStudentHomePageProps) {
        super(props);
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }

        return (
            <div className='divWrapper'>
                <StudentGradesComponent/>
                This is student home page
            </div>
        )
    }

    private func = () => {

    }
}
