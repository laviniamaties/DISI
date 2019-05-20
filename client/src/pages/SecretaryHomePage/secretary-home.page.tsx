import './secretary-styles.css';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';
import LoginForm from '../../Components/login-form';
import StudentListComponent from '../../Components/student-list.component';
import StudentProfile from '../../Components/student-profile';

export default class SecretaryHomePage extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            student: {
                id: -1,
                firstname: '',
                lastname:'',
                email: '',
                phone: '',
                address: '',
            }
        }
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }
        const { student } = this.state;
        return (
            <div className='divWrapper'>
                <div className={'row'}>
                    <div className={'col-sm'}>
                        <StudentListComponent onStudentSelect={this.selectStudent}/>
                    </div>
                    <div className={'col-sm'}>
                        <StudentProfile student={student}/>
                    </div>
                </div>
            </div>
        )
    }

    private selectStudent = (student: any) => {
        console.log(student);
        this.setState({
            student
        })
    };

    private func = () => {

    }
}
