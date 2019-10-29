import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Categories from './categories/Categories';

import Header from '../../Header'

import { withTranslation } from 'react-i18next';

class Explore extends Component {
    constructor() {
        super()
        this.state = {
            name: "name"
        }
    }

    logout = () => {
        let adminLogin = { username: "", isLoggedIn: false }
        localStorage.adminLogin = JSON.stringify(adminLogin)
        this.setState({ adminLogin: adminLogin })
    }

    render() {
        const { t, i18n } = this.props
        return (
            <div>
                <Header/>
                <Categories />
            </div>)
    }
}
export default withTranslation('translation')(Explore);
