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
                
                {/* <Link to="/admin"><button onClick={this.logout}>{t("Log out")}</button> </Link>
                <Link to="/admin/explore">{t("Explore")}</Link>
                <Link to="/admin/search">{t("Search")}</Link> */}

                <Categories />
            </div>)
    }
}
export default withTranslation('translation')(Explore);
