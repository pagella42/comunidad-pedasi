import React, { Component } from 'react';
import axios from 'axios'

class SignUp extends Component {
    constructor(){
        this.state = {
            phone: "",
            name:"",
            adress:"",
        }
    }
    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({[name] : value})
    }

    // signUp = () => {
    //     axios.post("")
    // }

    render() {
        return (
            <div>
                <h3>// Sign up form</h3>
                <input type="text" onChange={this.handleChange} name="phone" placeholder="phone" />
                <input type="text" onChange={this.handleChange} name="name" placeholder="name"/>
                <input type="text" onChange={this.handleChange} name="adress" placeholder="adress"/>
                <button>Sign up</button>
            </div>
        );
    }
}

export default SignUp;