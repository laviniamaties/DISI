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
                <div className="container text-center">
                    <h5>Student Profile</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className='secretary-form'>
                        <div>FirstName</div>
                            <input
                                type="text"
                                name="firstname"
                                value = {this.state.firstname}
                                onChange={this.handleChange}
                                className={'form-control'}
                            />
                        <div>LastName</div>

                            <input
                                type="text"
                                name="lastname"
                                value = { this.state.lastname}
                                onChange={this.handleChange}
                                className={'form-control'}
                            />

                        <div>Email</div>
                            <input
                                type="text"
                                name="email"
                                value = { this.state.email}
                                onChange={this.handleChange}
                                className={'form-control'}
                            />
                         <div>Phone</div>
                            <input
                                type="text"
                                name="phone"
                                value = { this.state.phone}
                                onChange={this.handleChange}
                                className={'form-control'}
                            />
                         <div>Address</div>    
                            <input
                                type="text"
                                name="address"
                                value = { this.state.address}
                                onChange={this.handleChange}
                                className={'form-control'}
                            />
                        <div><button>View</button></div>
                        <button>Update</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SecretaryForm