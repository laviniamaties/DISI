import './secretary-styles.css';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';
import StudentListComponent from '../../Components/student-list.component';
import StudentProfile from '../../Components/student-profile';
import HttpService from "../../Services/http-service";
import {IUser} from "../../Models/IUser";

export default class SecretaryHomePage extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            group: {
                id: -1,
                title: ''
            },
            student: {
                id: -1,
                firstname: '',
                lastname:'',
                email: '',
                phone: '',
                address: '',
            },
            studentList: [],
            studentGroups: []
        }
    }

    public componentWillMount(): void {
        this.getStudentList();
        this.getStudentGroups();
    }

    public componentDidUpdate(prevProps: any, prevState: any): void {
        if (this.state.student !== prevState.student) {
            this.getStudentList();
        }
        if (this.state.group !== prevState.group) {
            this.getStudentGroups();
        }
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }
        const { student, studentList } = this.state;
        return (
            <div style={{alignItems: 'center', marginLeft: 32, marginTop: 32, width: '100%'}}>
                <div className="input-group mb-3" style={{width: '73%'}}>
                    <input type="text" name="title" className="form-control" placeholder="Group title"
                           aria-label="Group title" aria-describedby="basic-addon2" value={this.state.group.title} onChange={this.updateGroup}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.createNewGroup}>Add group</button>
                    </div>
                </div>
                <div className={'row'} style={{width: '75%'}}>
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

    private createNewGroup = () => {
        const { group } = this.state;
        const url =  'group/';
        HttpService.doPostRequest<any>(url, {title: group.title})
            .then(
                (result) => {
                    this.setState({
                        group: {
                            id: -1,
                            title: ''
                        }
                    });
                    console.log('group created', result)
                }
            )
            .catch((error) => {
                this.setState({
                    errorMessage: error
                })
            });
    };

    private updateGroup = (e: any) => {
        const title  = e.target.value;
        this.setState((prevState: any) => ({
            ...prevState,
            group: {
                ...prevState.group,
                title
            }
        }));
    };
    
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
    };

    private getStudentGroups = () => {
        HttpService.doGetRequest('group')
            .then(res => {
                console.log(res);
                this.setState({
                    studentGroups: res
                });
            })
            .catch(err => {
                this.setState({
                    err
                })
            });
    }
}
