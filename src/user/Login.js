import React, { Component } from 'react';

class UserLogin extends Component {
    render() {
        return (
            <div>
                <input type="text" placeholder="username"/>
                <input type="password"/>
            </div>
        );
    }
}

export default UserLogin;