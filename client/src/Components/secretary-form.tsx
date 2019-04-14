import React, { Component } from 'react'

class SecretaryForm extends Component {

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


        public render(): any {
            return(
                <div className="container">
                    <h5>Student Profile</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className='secretary-form'>
                            <input
                                type="text"
                                name="firstname"
                                value = {this.state.firstname}
                                onChange={this.handleChange}
                                className={'form-input'}
                            />
                            <input
                                type="text"
                                name="lastname"
                                value = { this.state.lastname}
                                onChange={this.handleChange}
                                className={'form-input'}
                            />
                            <input
                                type="text"
                                name="email"
                                value = { this.state.email}
                                onChange={this.handleChange}
                                className={'form-input'}
                            />
                        <input
                            type="text"
                            name="phone"
                            value = { this.state.phone}
                            onChange={this.handleChange}
                            className={'form-input'}
                        />
                        <input
                            type="text"
                            name="address"
                            value = { this.state.address}
                            onChange={this.handleChange}
                            className={'form-input'}
                        />
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SecretaryForm