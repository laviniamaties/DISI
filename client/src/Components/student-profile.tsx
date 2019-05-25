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
                <div> FirstName :
                    <label>
                        <input type="text" name="firstName" value = {student.firstName || ''} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Last Name :
                    <label>
                        <input type="text" name="lastName" value = {student.lastName || ''} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Email     :
                    <label>
                        <input type="text" name="email" value = {student.email || ''} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Phone     :
                    <label>
                        <input type="text" name="phone" value = {student.phone || ''} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Address   :
                    <label>
                        <input type="text" name="address" value = { student.address || '' } onChange={this.handleChange}/>
                    </label>
                </div>
                <button className="btn btn-primary login-btn">Submit</button>
                </form>
            </div>
        )
    }
}
