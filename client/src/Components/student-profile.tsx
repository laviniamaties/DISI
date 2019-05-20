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
            this.setState({
                student: nextProps.student
            })
        }
    }

    public componentWillMount(): void {
        const authenticatedUser = AuthService.getAuthenticatedUser();

        this.setState({
            email: authenticatedUser.email,
            firstname: authenticatedUser.firstName,
            lastname: authenticatedUser.lastName,
            phone: authenticatedUser.phone,
            address: authenticatedUser.address

        })
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();

        const authenticatedUser = AuthService.getAuthenticatedUser();

        const user : IUser = {
            id: authenticatedUser.id,
            email: this.state.email,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            phone: this.state.phone,
            address: this.state.address
        };

        console.log(authenticatedUser);
        const url =  'users/' + authenticatedUser.id;

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
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleButtonClick = () => {
        this.setState((state: any) => {
          return {
            open: !state.open,
          };
        });
    }

    public render(): any {
        const { student } = this.state;
        return(
            <div style={{marginTop: 16}}>
                <form onSubmit={this.handleSubmit}>
                <div> FirstName :
                    <label>
                        <input type="text" name="firstname" value = {student.firstname || ''} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Last Name :
                    <label>
                        <input type="text" name="lastname" value = {student.lastname || ''} onChange={this.handleChange}/>
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
