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

    public componentWillMount(): void {
        const authenticatedUser = AuthService.getAuthenticatedUser();

        this.setState({
            student: {
                email: authenticatedUser.email,
                firstName: authenticatedUser.firstName,
                lastName: authenticatedUser.lastName,
                phone: authenticatedUser.phone,
                address: authenticatedUser.address
            }
        })
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
        const url =  'users/' + user.id;

        HttpService.doUpdateRequest<IUser>(url, user)
            .then(
                (result) => {
                    console.log('student / update successful');
                }
            )
            .catch((error) => {
                console.log(error)
                this.setState({
                    errorMessage: error
                })
            })
    }

    private handleChange = (e: any) => {
        console.log(e.target.name, e.target.value);
        const updates = {
            [e.target.name]: e.target.value
        };

        console.log(updates);
        this.setState((prevState: any) => ({
            student: {
                ...prevState.student,
                ...updates
            }
        }))
    };

    handleButtonClick = () => {
        this.setState((state: any) => {
          return {
            open: !state.open,
          };
        });
    }

    public render(): any {
        const { student } = this.state;
        console.log(this.state);
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
