import React, { Component } from 'react'
import './login-form.styles.css';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        role: 'Student',
        open: false, 
        isRegisterForm: false
    }

    // private isRegisterForm = false;

    private handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(this.state)
    }

    private handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    private selectRole = (e: any): void => {
        this.setState({
            role: e.target.value
        })
    }

    private togglRegisterState(e: any){
        e.preventDefault();
        e.stopPropagation();
        this.setState({isRegisterForm: !this.state.isRegisterForm});
    }

    public render(): any {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>{this.state.isRegisterForm ? "Login" : "Register"}</h1>
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
                                    !this.state.isRegisterForm ?
                                    <div>
                                        <div>Type</div>
                                        <div>
                                            <select value={this.state.role} onChange={this.selectRole} className="form-control">
                                                <option>Student</option>
                                                <option>Secretary</option>
                                                <option>Teacher</option>
                                            </select>
                                        </div>
                                    </div> : <div></div>
                                }
                                <button className="btn btn-primary login-btn">{this.state.isRegisterForm ? "Login" : "Register"}</button>
                                <div>
                                    <a href="#" onClick={(e) => this.togglRegisterState(e)}>{this.state.isRegisterForm ? "Create an Account" : "Already have an account? Sign in"}</a>  
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
