import React, { Component } from 'react';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            phone: "",
        }
    }
    handleInputChange = (event) => {
        let phone = event.target.value
        this.setState({phone : phone}) 
    }

    login = () => {
        debugger
        this.props.login(this.state.phone)
    }

    render() {
        return (
            <div>
                <input type="string" placeholder="phone number" name="phone" onChange={this.handleInputChange}/>
                <input type="password" placeholder="password" />
                <button onClick={this.login}>Log In</button>
            </div>
        );
    }
}

export default Login;