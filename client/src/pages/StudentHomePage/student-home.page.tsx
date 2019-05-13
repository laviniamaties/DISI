import './student-styles.css';
import React, { PureComponent } from 'react';
import StudentProfile from '../../Components/student-profile';
import AuthService from '../../Services/auth-service';
import { Redirect } from 'react-router';
import StudentGradesComponent from '../../Components/student-grades/student-grades.component';

interface IStudentHomePageState {

}

interface IStudentHomePageProps {

}
export default class StudentHomePage extends PureComponent<IStudentHomePageProps, IStudentHomePageState> {
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
                <StudentProfile/>
                <StudentGradesComponent/>
            </div>
        )
    }

    private func = () => {

    }
}
