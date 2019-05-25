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
            selectedGroupId: 0,
            studentGroup: {
                student: {
                    id: -1,
                    firstname: '',
                    lastname:'',
                    email: '',
                    phone: '',
                    address: '',
                },
                group: {
                    userId: -1,
                    groupId: -1
                }
            },
            studentList: [],
            studentGroups: []
        }
    }

    public componentWillMount(): void {
        const id = this.state.studentGroups && this.state.studentGroups[0] && this.state.studentGroups[0].id;
        if (id) {
            this.getStudentsByGroup(id);
        }
        this.getStudentGroups();
    }

    public componentDidUpdate(prevProps: any, prevState: any): void {
        if (this.state.studentGroup.student !== prevState.studentGroup.student) {
            this.getStudentsByGroup(this.state.studentGroups[0].id);
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
        const { studentGroup, studentList, studentGroups } = this.state;
        return (
            <div style={{alignItems: 'center', marginLeft: 32, marginTop: 32, width: '100%'}}>
                <div className="input-group mb-3" style={{width: '72%'}}>
                    <input type="text" name="title" className="form-control" placeholder="Group title"
                           aria-label="Group title" aria-describedby="basic-addon2" value={this.state.group.title} onChange={this.updateGroup}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.createNewGroup}>Add group</button>
                    </div>
                </div>
                <div style={{width: '70%'}}>
                    {this.renderGroups()}
                </div>
                <div className={'row'} style={{width: '75%'}}>
                    <div className={'col-sm'}>
                        <StudentListComponent studentList={studentList} onStudentSelect={this.selectStudent}/>
                    </div>
                    <div className={'col-sm'}>
                        <StudentProfile
                            studentGroups={studentGroups}
                            studentGroup={studentGroup}
                            onUserUpdate={this.onStudentUpdate}
                            onGroupUpdate={this.updateGroupForStudent}
                        />
                    </div>
                </div>
            </div>
        )
    }

    private renderGroups = (): any => {
        const { studentGroups } = this.state;

        if (!studentGroups.length) {
            return null;
        }

        return (
            <div className="btn-group" role="group" aria-label="Basic example">
                {
                    studentGroups.map((item: any, index: number) => {
                        return (
                            <button type="button" className="btn btn-secondary" key={index} onClick={this.getStudentsByGroup(item)}>{item.title}</button>
                        );
                    })
                }
            </div>
        );
    };

    private getStudentsByGroup = (group: any) => () => {
        HttpService.doGetRequest(`usergroup/${group.id}`)
            .then(res => {
                console.log(res);
                this.setState({
                    selectedGroupId: group.id,
                    studentList: res
                });
            })
            .catch(err => {
                this.setState({
                    err
                })
            });
    };

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
                console.log(error);
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
        this.setState((prevState: any) => ({
            studentGroup: {
                ...prevState.studentGroup,
                student,
                group: {
                    userId: student.id,
                    groupId: this.state.selectedGroupId
                }
            }
        }))
    };

    private onStudentUpdate = (student: any) => {
        const url =  'users/' + student.id;
        HttpService.doUpdateRequest<IUser>(url, student)
            .then(
                (result) => {
                    this.setState((prevState: any) => ({
                        studentGroup: {
                            ...prevState.studentGroup,
                            student: result
                        }
                    }));
                }
            )
            .catch((error) => {
                this.setState({
                    errorMessage: error
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

    private updateGroupForStudent = (studentGroup: any) => {
        console.log(studentGroup);
    }
}
