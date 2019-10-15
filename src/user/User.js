import React, { Component } from 'react';
import UserLanding from './landing/Landing';
import UserLogin from './Login';

class User extends Component {
    constructor(){
        super()
        this.state = {
            isLoggedIn : false,
        }
    }
    render() {
        return (
            <div>
                {this.state.isLoggedIn ? <UserLanding /> : <UserLogin />}
            </div>
        );
    }
}

export default User;