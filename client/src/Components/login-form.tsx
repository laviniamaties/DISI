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
        return(
            <div className="container">
                <h5>Login</h5>
                <form onSubmit={this.handleSubmit}>
                    <div className='login-form'>
                        <input
                            type="text"
                            name="email"
                            value = {this.state.email}
                            onChange={this.handleChange}
                            className={'form-input'}
                        />
                        <input
                            type="password"
                            name="password"
                            value = { this.state.password}
                            onChange={this.handleChange}
                            datatype={'password'}
                            className={'form-input'}
                        />
                        <div className={'form-input'}>
                            <select value={this.state.role} onChange={this.selectRole}>
                                <option>Student</option>
                                <option>Secretary</option>
                                <option>Teacher</option>
                            </select>
                        </div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm
