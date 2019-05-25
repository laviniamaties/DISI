import './secretary-styles.css';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';
import LoginForm from '../../Components/login-form';
import StudentListComponent from '../../Components/student-list.component';
import StudentProfile from '../../Components/student-profile';
import HttpService from "../../Services/http-service";
import {IUser} from "../../Models/IUser";

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
            },
            studentList: []
        }
    }

    public componentWillMount(): void {
        this.getStudentList();
    }

    public componentDidUpdate(prevProps: any, prevState: any): void {
        if (JSON.stringify(this.state.student) !== JSON.stringify(prevState.student)) {
            this.getStudentList();
        }
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }
        const { student, studentList } = this.state;
        return (
            <div className='divWrapper'>
                <div className={'row'}>
                    <div className={'col-sm'}>
                        <StudentListComponent studentList={studentList} onStudentSelect={this.selectStudent}/>
                    </div>
                    <div className={'col-sm'}>
                        <StudentProfile student={student} onUserUpdate={this.onStudentUpdate}/>
                    </div>
                </div>
            </div>
        )
    }

    private selectStudent = (student: any) => {
        this.setState({
            student
        })
    };

    private onStudentUpdate = (student: any) => {
        const url =  'users/' + student.id;
        HttpService.doUpdateRequest<IUser>(url, student)
            .then(
                (result) => {
                    this.setState({
                        student: result
                    });
                }
            )
            .catch((error) => {
                this.setState({
                    errorMessage: error
                })
            });
    };

    private getStudentList = () => {
        HttpService.doGetRequest('users')
            .then(res => {
                this.setState({
                    studentList: res.filter((item: any) => item.role === 0)
                });
            })
            .catch(err => {
                this.setState({
                    err
                })
            });
    }
}
