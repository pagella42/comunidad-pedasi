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
        localStorage.login = JSON.stringify(login)
    }

    logout = () => {
        localStorage.clear()
        let login = {username: "", isLoggedIn: false}
        this.setState({login: login})
    }

    componentDidMount(){
        let login
        if (localStorage.login) {
            login = JSON.parse(localStorage.login)
        } else {
            login = this.state.login
        }
        this.setState({ login: login })
    }

    render() {
        return (
            <div>
                {this.state.login.isLoggedIn 
                    ? <div>
                    <button onClick={this.logout}>Log out</button>
                        <Landing phone={this.state.login.phone}/> 
                    </div> 
                    : <Login login={this.login} />}
            </div>
        );
    }
}

export default User;