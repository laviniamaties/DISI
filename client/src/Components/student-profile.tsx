import React, { PureComponent } from 'react'
import AuthService from '../Services/auth-service';
import HttpService from '../Services/http-service';
import { IUser, Role } from '../Models/IUser';

export default class StudentProfile extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            student: props.student
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        if (nextProps.student !== this.state.student) {
            this.setState((prevState: any) => ({
                student: nextProps.student || prevState.student
            }));
        }
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
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

    public render(): any {
        const { student } = this.state;
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
                <button className="btn btn-primary login-btn">Submit</button>
                </form>
            </div>
        )
    }
}
