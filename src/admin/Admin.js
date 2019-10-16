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
            },
            password: "12345",
        }
    }

    login = (username, password) => {
        if(password === this.state.password){
            let login = { username: username, isLoggedIn: true }
            this.setState({ login: login })
            localStorage.login = JSON.stringify(login)
        } else {
            alert("Wrong password")
        }
    }
    logout = () => {
        localStorage.clear()
        let login = {username : "", isLoggedIn : false}
        this.setState({login:login})
    }

    componentDidMount(){
        let login
        if(localStorage.login){
            login = JSON.parse(localStorage.login)
        } else {
            login = this.state.login
        }
        this.setState({login : login})
    }

    render() {
        return (
            <div>
                {this.state.login.isLoggedIn ? <Landing /> : <Login login={this.login} />}
                <button onClick={this.logout}>Log out</button>
                {/* ==== Admin Routes below ====  */}
                {/* <Route path="/admin/explore" exact render={() => <Explore />} />
                <Route path="/admin/search" exact render={() => <Search />} /> */}
            </div>
        )
    }
}
export default Admin;