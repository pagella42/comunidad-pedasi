import React, { Component } from 'react';
import { Link } from "react-router-dom";


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
        this.props.login(this.state.phone)
    }

    loginHandler=()=>{
        this.login()
        this.props.loginPopup()
    }

    render() {
        return (
            <div>
                <div onClick={this.props.loginPopup}>X</div>
                <input type="string" placeholder="phone number" name="phone" onChange={this.handleInputChange}/>
                <input type="password" placeholder="password" />
                <button onClick={this.loginHandler}>Log In</button>
                <Link to="/user/signUp">Don't have an account? SignUp</Link>
            </div>
        );
    }
}

export default Login;