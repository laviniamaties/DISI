import React, { PureComponent } from 'react'
import AuthService from '../Services/auth-service';
import { IUser } from '../Models/IUser';

export default class StudentProfile extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            group: props.group,
            student: props.student,
            studentGroups: props.studentGroups
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        const newState: any = {};
        if (JSON.stringify(nextProps.studentGroups) !== JSON.stringify(this.state.studentGroups)) {
            newState.studentGroups = nextProps.studentGroups;
        }
        if (JSON.stringify(nextProps.student) !== JSON.stringify(this.state.student)) {
            newState.student = nextProps.student;
        }
        if (JSON.stringify(nextProps.group) !== JSON.stringify(this.state.group)) {
            newState.group = nextProps.group;
        }

        if (Object.keys(newState).length) {
            this.setState(newState);
        }
    }

    public render(): any {
        const { group, student, studentGroups } = this.state;
        return(
            <div style={{marginTop: 16}}>
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
                        {this.props.isSecretary && <select value={group.title} onChange={this.selectGroup} className="form-control">
                            {
                                studentGroups.map((item: any, index: number) => {
                                    return (
                                        <option key={index}>{item.title}</option>
                                    );
                                })
                            }
                        </select>}
                    </div>
                </div>
                <button className="btn btn-primary login-btn" onClick={this.handleSubmit}>Update profile</button>
                {this.props.isSecretary && <button className="btn btn-primary login-btn" onClick={this.handleUpdateGroup}>Update group</button>}
            </div>
        )
    }

    private selectGroup = (e: any) => {
        const { studentGroups } = this.state;

        this.setState({
            group: studentGroups.find((item: any) => item.title === e.target.value)
        })
    };

    private handleSubmit = (e: any) => {
        const { student } = this.state;
        const authenticatedUser = AuthService.getAuthenticatedUser();

        let id;
        if (this.state.student && this.state.student.id) {
            id = this.state.student.id;
        } else {
            id = authenticatedUser.id;
        }
        const user : IUser = {
            id,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            phone: student.phone,
            address: student.address
        };

        if (this.props.onUserUpdate) {
            this.props.onUserUpdate(user);
        }
    };

    private handleUpdateGroup = () => {
        const { student, group } = this.state;
        if (this.props.onGroupUpdate) {
            this.props.onGroupUpdate(student, group);
        }
    };

    private handleChange = (e: any) => {
        const updates = {
            [e.target.name]: e.target.value
        };

        this.setState((prevState: any) => ({
            student: {
                ...prevState.student,
                ...updates
            }
        }))
    };

}
