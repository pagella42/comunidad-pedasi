import React, { Component } from 'react';
import Login from './login/Login'
import { withTranslation } from 'react-i18next';
import Landing from './landing/Landing'
import Header from './Header'

import Button from '@material-ui/core/Button';


class Admin extends Component {
    constructor() {
        super()
        this.state = {
            adminLogin: {
                username: "",
                isLoggedIn: false,
            },
            password: "12345",
            admin:"user",
            match:true
        }
    }

    
    login = (username, password) => {
        const t = this.props.t
        if (password === this.state.password && username === this.state.admin) {
            let adminLogin = { username: username, isLoggedIn: true }
            this.setState({ adminLogin: adminLogin })
            localStorage.adminLogin = JSON.stringify(adminLogin)
        } else {
            this.setState({match:false})
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
                <Header home={true} 
                logout={this.logout}/>
                {this.state.adminLogin.isLoggedIn ?
                    <div>
                        <Landing logout={this.logout} />
                    </div>
                    : <Login match = {this.state.match} login={this.login} />}
            </div>
        )
    }
}
export default withTranslation('translation')(Admin);
