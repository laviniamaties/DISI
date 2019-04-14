import React, { Component } from 'react'
import './login-form.styles.css';
import HttpService from '../Services/http-service';
import { IUser, Role } from '../Models/IUser';

class LoginForm extends Component {

    state = {
        open: false, 
        email: '',
        password: '',
        role: 0,
        isLoginForm: true,
        errorMessage: ''
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        var user : IUser = {
            Email: this.state.email, 
            Password: this.state.password, 
            Role: this.state.role, 
            ID: 0
        };
        let url = !this.state.isLoginForm ? 'users' : 'login';
        HttpService.doPostRequest<IUser>(url, user)
            .then(
                (result) => {
                    console.log('login / register successful');
                    this.setState({
                        errorMessage: ''
                    })
                }
            )
            .catch((error) => {
                console.log(error)
                this.setState({
                    errorMessage: error.data
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

    private togglRegisterState(e: any){
        this.setState({isLoginForm: !this.state.isLoginForm, errorMessage: ''});
    }

    public render(): any {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>{this.state.isLoginForm ? "Login" : "Register"}</h1>
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
                                    !this.state.isLoginForm ?
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
                                <button className="btn btn-primary login-btn">{this.state.isLoginForm ? "Login" : "Register"}</button>
                                <div>
                                    <a href="#" onClick={(e) => this.togglRegisterState(e)}>{this.state.isLoginForm ? "Create an Account" : "Already have an account? Sign in"}</a>  
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm
