import './student-styles.css';
import React, { PureComponent } from 'react';
import StudentProfile from '../../Components/student-profile';
import AuthService from '../../Services/auth-service';
import { Redirect } from 'react-router';
import StudentGradesComponent from '../../Components/student-grades/student-grades.component';
import HttpService from "../../Services/http-service";
import {IUser} from "../../Models/IUser";

export default class StudentHomePage extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);
    }

    public componentWillMount(): void {
        const authenticatedUser = AuthService.getAuthenticatedUser();

        this.setState({
            student: {
                id: authenticatedUser.id,
                email: authenticatedUser.email,
                firstName: authenticatedUser.firstName,
                lastName: authenticatedUser.lastName,
                phone: authenticatedUser.phone,
                address: authenticatedUser.address
            }
        })
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }

        return (
            <div className='divWrapper'>
                <StudentProfile student={this.state.student} onUserUpdate={this.onStudentUpdate}/>
                <StudentGradesComponent/>
            </div>
        )
    }

    private onStudentUpdate = (student: any) => {
        const url =  'users/' + student.id;
        HttpService.doUpdateRequest<IUser>(url, student)
            .then(
                (result) => {
                    console.log('updatedSuccessfully');
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
}
