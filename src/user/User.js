import React, { Component } from 'react';
import Landing from './landing/Landing';
import Login from './Login';

class User extends Component {
    constructor(){
        super()
        this.state = {
            login : {phone:"", 
        isLoggedIn:false,}
        }
    }

    login = (phone) => {
        let login = {phone : phone, isLoggedIn : true}
        this.setState({login : login})
    }

    render() {
        return (
            <div>
                {this.state.login.isLoggedIn ? <Landing phone={this.state.login.phone}/> : <Login login={this.login} />}
            </div>
        );
    }
}

export default User;