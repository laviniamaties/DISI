import React, { Component } from 'react'

class LoginForm extends Component { 

    state = {
        email: '',
        password: '',
        role: '', 
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

    handleButtonClick = () => {
        this.setState((state: any) => {
          return {
            open: !state.open,
          };
        });
      }
    
    public render(): any { 
        return(
            <div className="login_form">
                <h5>This is the login Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="email" value = {this.state.email} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input type="text" name="password" value = { this.state.password} onChange={this.handleChange}/>
                    </label>
                    <button>Submit</button>

                </form>

                <div className="container">
                    <button type="button" className="button"onClick={this.handleButtonClick}>
                        ☰
                    </button>
                    {this.state.open && (
                        <div className="dropdown">
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                            <li>Option 4</li>
                        </ul>
                        </div>
                    )}
                </div>

            </div>
        )
    }
}

export default LoginForm