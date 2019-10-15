import React, { Component } from 'react';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
        }
    }
    handleInputChange = (event) => {
        let username = event.target.value
        this.setState({username : username}) 
    }

    login = () => {
        this.props.login(this.state.username)
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="username" onChange={this.handleInputChange}/>
                <input type="password" placeholder="password" />
                <button onClick={this.login}>Log In</button>
            </div>
        );
    }
}

export default Login;