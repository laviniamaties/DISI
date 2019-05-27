import './secretary-styles.css';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';
import StudentListComponent from '../../Components/student-list.component';
import StudentProfile from '../../Components/student-profile';
import HttpService from "../../Services/http-service";
import { IUser } from "../../Models/IUser";
import Select from "react-select";

export default class SecretaryHomePage extends PureComponent<any, any> {
    constructor(props: any)
    {
        super(props);

        this.state = {
            group: {
                id: -1,
                title: ''
            },
            selectedGroupId: 0,
            student: {
                id: -1,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
            },
            studentList: [],
            studentGroups: [],
            allStudents: [],
            selectedStudent: null
        }
    }

    public componentWillMount(): void
    {
        const id = this.state.studentGroups && this.state.studentGroups[0] && this.state.studentGroups[0].id;
        if (id)
        {
            this.getStudentsByGroup(id);
        }
        this.getStudentGroups();
        this.getAllStudents();
    }

    public componentDidUpdate(prevProps: any, prevState: any): void
    {
        if (this.state.student !== prevState.student)
        {
            this.getStudentsByGroup(this.state.selectedGroupId);
        }
        if (this.state.group !== prevState.group)
        {
            this.getStudentGroups();
        }
    }

    handleSelectChange = () => (value: any) =>
    {
        this.setState({
            selectedStudent: value
        });
    };

    public render(): any
    {
        let isAuth = AuthService.isAuth();
        if (!isAuth)
        {
            return <Redirect to='/login' />;
        }
        const { group, student, studentList, studentGroups } = this.state;
        let options = this.state.allStudents.map((s: any) => ({
            label: s.email,
            value: s.id
        }));
        return (
            <div style={{ alignItems: 'center', marginLeft: 32, marginTop: 32, width: '100%' }}>
                <div className="input-group mb-3" style={{ width: '72%' }}>
                    <input type="text" name="title" className="form-control" placeholder="Group title"
                        aria-label="Group title" aria-describedby="basic-addon2" value={this.state.group.title} onChange={this.updateGroup} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.createNewGroup}>Add group</button>
                    </div>
                </div>
                <div style={{ width: '70%' }}>
                    {this.renderGroups()}
                </div>
                <div className={'row'} style={{ width: '75%' }}>
                    <div className={'col-sm'}>
                        <StudentListComponent studentList={studentList} onStudentSelect={this.selectStudent} />
                        <br />
                        <Select
                            options={options}
                            value={this.state.multi}
                            autosize={true}
                            onChange={this.handleSelectChange()}
                            placeholder="Select Values"
                        />
                        <br />
                        <button className="btn btn-success" onClick={this.addUserGroup}>Add new user</button>
                    </div>
                    <div className={'col-sm'}>
                        <StudentProfile
                            studentGroups={studentGroups}
                            student={student}
                            group={group}
                            onUserUpdate={this.onStudentUpdate}
                            onGroupUpdate={this.updateGroupForStudent}
                            isSecretary={true}
                        />
                    </div>
                </div>
            </div>
        )
    }

    private addUserGroup = () => {
        console.log(this.state.selectedStudent)
        console.log(this.state.selectedGroupId)
        const userGroup = {
            userId: this.state.selectedStudent.value,
            groupId: this.state.selectedGroupId
        };
        HttpService.doPostRequest<any>('usergroup', userGroup)
            .then(res =>
            {
                this.getStudentsByGroup(this.state.selectedGroupId);
            }
            )
            .catch(err =>
            {
                console.log(err)
            })
    }

    private renderGroups = (): any =>
    {
        const { studentGroups } = this.state;

        if (!studentGroups.length)
        {
            return null;
        }

        return (
            <div className="btn-group" role="group" aria-label="Basic example">
                {
                    studentGroups.map((item: any, index: number) =>
                    {
                        return (
                            <button type="button" className="btn btn-secondary" key={index} onClick={() => this.getStudentsByGroup(item.id)}>{item.title}</button>
                        );
                    })
                }
            </div>
        );
    };

    private getStudentsByGroup = (groupId: number) =>
    {
        HttpService.doGetRequest(`usergroup/${groupId}`)
            .then(res =>
            {
                var newList = this.state.allStudents.filter((s:any) => !res.some((st:any) => st.id == s.id))
                this.setState((prevState: any) => ({
                    ...prevState,
                    selectedGroupId: groupId,
                    studentList: res,
                    allStudents: newList
                }));
            })
            .catch(err =>
            {
                this.setState({
                    err
                })
            });
    };

    private createNewGroup = () =>
    {
        const { group } = this.state;
        const url = 'group/';
        HttpService.doPostRequest<any>(url, { title: group.title })
            .then(
                (result) =>
                {
                    this.setState({
                        group: {
                            id: -1,
                            title: ''
                        }
                    });
                    console.log('group created', result)
                }
            )
            .catch((error) =>
            {
                console.log(error);
                this.setState({
                    errorMessage: error
                })
            });
    };

    private updateGroup = (e: any) =>
    {
        const title = e.target.value;
        this.setState((prevState: any) => ({
            ...prevState,
            group: {
                ...prevState.group,
                title
            }
        }));
    };

    private selectStudent = (student: any) =>
    {
        const { studentGroups, selectedGroupId } = this.state;
        this.setState({
            student,
            group: studentGroups.find((item: any) => item.id === selectedGroupId)
        });
    };

    private onStudentUpdate = (student: any) =>
    {
        const url = 'users/' + student.id;
        HttpService.doUpdateRequest<IUser>(url, student)
            .then(
                (result) =>
                {
                    console.log(result);
                    this.setState({
                        student: {
                            id: -1,
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            address: '',
                        }
                    });
                }
            )
            .catch((error) =>
            {
                this.setState({
                    errorMessage: error
                })
            });
    };

    private getStudentGroups = () =>
    {
        HttpService.doGetRequest('group')
            .then(res =>
            {
                this.setState({
                    studentGroups: res
                });
            })
            .catch(err =>
            {
                this.setState({
                    err
                })
            });
    };

    private getAllStudents = () =>
    {
        HttpService.doGetRequest<any>('users')
            .then(res =>
            {
                this.setState({
                    allStudents: res.filter(s => s.role == 0)
                });
            })
            .catch(err =>
            {
                this.setState({
                    err
                })
            });
    }

    private updateGroupForStudent = (student: any, group: any) =>
    {
        const userGroup = {
            userId: student.id,
            groupId: group.id
        };
        HttpService.doPostRequest<any>('usergroup', userGroup)
            .then(res =>
            {
                console.log(res);
                this.getStudentsByGroup(this.state.selectedGroupId);
            }
            )
            .catch(err =>
            {
                console.log(err)
            })
    }
}
