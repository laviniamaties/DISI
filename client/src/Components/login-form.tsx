import React, { PureComponent } from 'react'
import './login-form.styles.css';
import HttpService from '../Services/http-service';
import { IUser, Role } from '../Models/IUser';
import AuthService from '../Services/auth-service';

export default class LoginForm extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
            email: '',
            password: '',
            role: 0,
            isLoginForm: true,
            errorMessage: ''
        }
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();

        const user : IUser = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            id: 0
        };
        const url = !this.props.isLoginForm ? 'users' : 'login';

        HttpService.doPostRequest<IUser>(url, user)
            .then(
                (result) => {
                    console.log('login / register successful');

                    this.setState({
                        errorMessage: ''
                    });

                    AuthService.login(result);
                }
            )
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: !!error && !!error.data ? error.data : error
                })
            })
    }

    private handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    private selectRole = (e: any): void => {
        this.setState({
            role: Role[e.target.value]
        })
    }

    public render(): any {
        const { isLoginForm } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>{isLoginForm ? "Login" : "Register"}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className='login-form'>
                                <div>Email</div>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <div>Password</div>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    datatype={'password'}
                                />
                                {
                                    !isLoginForm ?
                                    <div>
                                        <div>Type</div>
                                        <div>
                                            <select value={Role[this.state.role]} onChange={this.selectRole} className="form-control">
                                                <option>{Role[Role.Student]}</option>
                                                <option>{Role[Role.Secretary]}</option>
                                                <option>{Role[Role.Teacher]}</option>
                                            </select>
                                        </div>
                                    </div> : <div></div>
                                }
                                <div style={{color:'red'}}>{this.state.errorMessage}</div>
                                <button className="btn btn-primary login-btn">{isLoginForm ? "Login" : "Register"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
