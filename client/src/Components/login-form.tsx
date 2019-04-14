import React, { Component } from 'react'
import './login-form.styles.css';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        role: 'Student',
        open: false
    }

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

    public render(): any {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>Login</h1>
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
                                <div>Type</div>
                                <div>
                                    <select value={this.state.role} onChange={this.selectRole} className="form-control">
                                        <option>Student</option>
                                        <option>Secretary</option>
                                        <option>Teacher</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary login-btn">Login</button>
                                <div>
                                    <a href="#">Create an Account</a>
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
