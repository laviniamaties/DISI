import React, { PureComponent } from 'react'

export default class StudentProfile extends PureComponent<any, any> { 

    state = {
        firstname: '',
        lastname:'',
        email: '',
        phone: '',
        address: '',
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
            <div className="student_form">
                <h5>This is the Student Profile</h5>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="firstname" value = {this.state.firstname} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input type="text" name="lastname" value = {this.state.lastname} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input type="text" name="email" value = {this.state.email} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input type="text" name="phone" value = {this.state.phone} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input type="text" name="address" value = { this.state.address} onChange={this.handleChange}/>
                    </label>
                    <button>Submit</button>

                </form>

                <div className="container">
                    <button type="button" className="button"onClick={this.handleButtonClick}>
                        ☰
                    </button>
                   
                </div>

            </div>
        )
    }
}