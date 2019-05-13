import React, { PureComponent } from 'react'
import AuthService from '../Services/auth-service';
import HttpService from '../Services/http-service';
import { IUser, Role } from '../Models/IUser';

export default class StudentProfile extends PureComponent<any, any> { 
    constructor(props: any) {
        super(props);

        this.state = {
            firstname: '',
            lastname:'',
            email: '',
            phone: '',
            address: '',
            open: false
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
 
        console.log(this.state)

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
        return(
            <div className="student_form">
                <h5>This is the Student Profile</h5>
                <form onSubmit={this.handleSubmit}>
                <div> FirstName :
                    <label>
                        <input type="text" name="firstname" value = {this.state.firstname} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Last Name : 
                    <label>
                        <input type="text" name="lastname" value = {this.state.lastname} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Email     : 
                    <label>
                        <input type="text" name="email" value = {this.state.email} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Phone     :
                    <label>
                        <input type="text" name="phone" value = {this.state.phone} onChange={this.handleChange}/>
                    </label>
                </div>
                <div> Address   : 
                    <label>
                        <input type="text" name="address" value = { this.state.address} onChange={this.handleChange}/>
                    </label>
                </div>
                <button className="btn btn-primary login-btn">Submit</button>
                </form>
            </div>
        )
    }
}