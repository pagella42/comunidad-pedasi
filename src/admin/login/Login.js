import React, { Component } from 'react';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password:"",
        }
    }
    handleInputChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name] : value}) 
    }

    login = () => {
        this.props.login(this.state.username, this.state.password)
    }
    render() {
        return (
            <div>
                <input type="text" placeholder="username" name="username" onChange={this.handleInputChange}/>
                <input type="password" placeholder="password" name="password" onChange={this.handleInputChange} />
                <button onClick={this.login}>Log In</button>
            </div>
        );
    }
}

export default Login;