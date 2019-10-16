import React, { Component } from 'react';
import Landing from './landing/Landing';
import Login from './Login';

class User extends Component {
    constructor(){
        super()
        this.state = {
            login : {username:"", 
        isLoggedIn:false,}
        }
    }

    login = (username) => {
        let login = {username : username, isLoggedIn : true}
        this.setState({login : login})
    }

    render() {
        return (
            <div>
                {this.state.login.isLoggedIn ? <Landing /> : <Login login={this.login} />}
            </div>
        );
    }
}

export default User;