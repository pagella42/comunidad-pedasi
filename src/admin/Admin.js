import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Landing from './landing/Landing'
import Login from './login/Login'
import Explore from './landing/explore/Explore'
import Search from './landing/search/Search'
class Admin extends Component {
    constructor() {
        super()
        this.state = {
            adminLogin: {
                username: "",
                isLoggedIn: false,
            },
            password: "12345",
        }
    }

    login = (username, password) => {
        if (password === this.state.password) {
            let adminLogin = { username: username, isLoggedIn: true }
            this.setState({ adminLogin: adminLogin })
            localStorage.adminLogin = JSON.stringify(adminLogin)
        } else {
            alert("Wrong password")
        }
    }
    logout = () => {
        let adminLogin = { username: "", isLoggedIn: false }
        localStorage.adminLogin = JSON.stringify(adminLogin)
        this.setState({ adminLogin: adminLogin })
    }

    componentDidMount() {
        let adminLogin
        if (localStorage.adminLogin !== undefined) {
            adminLogin = JSON.parse(localStorage.adminLogin)
        } else {
            adminLogin = this.state.adminLogin
        }
        this.setState({ adminLogin: adminLogin })
    }

render() {
    return (
        <div>
            {this.state.adminLogin.isLoggedIn ?
                <div> <Landing />
                    <button onClick={this.logout}>Log out</button>
                </div>
                : <Login login={this.login} />}

            {/* ==== Admin Routes below ====  */}
            {/* <Route path="/admin/explore" exact render={() => <Explore />} />
                <Route path="/admin/search" exact render={() => <Search />} /> */}
        </div>
    )
}
}
export default Admin;