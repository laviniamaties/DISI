import React, { PureComponent } from 'react'
import AuthService from '../Services/auth-service';
import HttpService from '../Services/http-service';
import { IUser, Role } from '../Models/IUser';

export default class StudentProfile extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            selectedGroup: undefined,
            studentGroup: props.studentGroup,
            studentGroups: props.studentGroups
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        const newState: any = {};
        if (JSON.stringify(nextProps.studentGroups) !== JSON.stringify(this.state.studentGroups)) {
            newState.studentGroups = nextProps.studentGroups;
        }
        if (JSON.stringify(nextProps.studentGroup) !== JSON.stringify(this.state.studentGroup)) {
            newState.studentGroup = nextProps.studentGroup;
            if (nextProps.studentGroups && nextProps.studentGroups.length) {
                newState.selectedGroup = nextProps.studentGroups.find((item: any) => item.id == nextProps.studentGroup.group.id);
                console.log(newState);
            }
        }

        if (Object.keys(newState).length) {
            this.setState(newState);
        }
    }

    public render(): any {
        const { studentGroup, studentGroups, selectedGroup } = this.state;
        const { student, group } = studentGroup;
        return(
            <div style={{marginTop: 16}}>
                <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">First name</span>
                    </div>
                    <input type="text" name="firstName" className="form-control" placeholder="First name" aria-label="First name"
                           aria-describedby="basic-addon1" value={student.firstName || ''} onChange={this.handleChange}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Last name</span>
                    </div>
                    <input type="text" name="lastName"  className="form-control" placeholder="Last name" aria-label="Last name"
                           aria-describedby="basic-addon1" value={student.lastName || ''} onChange={this.handleChange}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Email</span>
                    </div>
                    <input type="text" name="email" className="form-control" placeholder="Email" aria-label="Email"
                           aria-describedby="basic-addon1" value={student.email || ''} onChange={this.handleChange}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Phone</span>
                    </div>
                    <input type="text" name="phone" className="form-control" placeholder="Phone" aria-label="Phone"
                           aria-describedby="basic-addon1" value={student.phone || ''} onChange={this.handleChange}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Address</span>
                    </div>
                    <input type="text" name="address" className="form-control" placeholder="Address" aria-label="Address"
                           aria-describedby="basic-addon1" value={student.address || ''} onChange={this.handleChange}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Group</span>
                    </div>
                    <div>
                        <select value={selectedGroup} onChange={this.selectGroup} className="form-control">
                            {
                                studentGroups.map((item: any, index: number) => {
                                    return (
                                        <option key={index}>{item.title}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary login-btn" onClick={this.handleSubmit}>Update profile</button>
                <button className="btn btn-primary login-btn" onClick={this.handleUpdateGroup}>Update group</button>
                </form>
            </div>
        )
    }

    private selectGroup = () => {

    };

    private handleSubmit = (e: any) => {
        e.preventDefault();
        const { studentGroup } = this.state;
        const authenticatedUser = AuthService.getAuthenticatedUser();

        let id;
        if (this.state.studentGroup && this.state.studentGroup.student.id) {
            id = this.state.studentGroup.student.id;
        } else {
            id = authenticatedUser.id;
        }
        const user : IUser = {
            id,
            email: studentGroup.student.email,
            firstName: studentGroup.student.firstName,
            lastName: studentGroup.student.lastName,
            phone: studentGroup.student.phone,
            address: studentGroup.student.address
        };

        if (this.props.onUserUpdate) {
            this.props.onUserUpdate(user);
        }
    };

    private handleUpdateGroup = () => {
        const { studentGroup } = this.state;
        if (this.props.onGroupUpdate) {
            this.props.onGroupUpdate(studentGroup);
        }
    };

    private handleChange = (e: any) => {
        const updates = {
            [e.target.name]: e.target.value
        };

        this.setState((prevState: any) => ({
            studentGroup: {
                ...prevState.studentGroup,
                student: {
                    ...prevState.studentGroup.student,
                    ...updates
                }
            }
        }))
    };

}
