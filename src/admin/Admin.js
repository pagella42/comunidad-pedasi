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
                {this.state.login.isLoggedIn ? <Landing /> : <Login login={this.login} />}

                {/* ==== Admin Routes below ====  */}
                <Route path="/admin/explore" exact render={() => <Explore />} />
                <Route path="/admin/search" exact render={() => <Search />} />
            </div>
        )
    }
}
export default Admin;