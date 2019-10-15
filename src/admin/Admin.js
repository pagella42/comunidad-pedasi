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
            login: {
                username: "",
                isLoggedIn: false,
            }
        }
    }

    login = (username) => {
        let login = { username: username, isLoggedIn: true }
        this.setState({ login: login })
    }

    render() {
        return (
            <div>
                <Route path="/admin/landing" exact render={() => <Landing />}/>
                <Route path="/admin/login" exact render={() => <Login login={this.login} />}/>
                <Route path="/admin/landing/explore" exact render={() => <Explore />} />
                <Route path="/admin/landing/search" exact render={() => <Search />} />
                {this.state.login.isLoggedIn ? <Landing /> : <Login login={this.login} />}
            </div>
        )
    }
}
export default Admin;