import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';


class Header extends Component {


    render() {
        const{t,i18n, changeLanguage, english}=this.props
        let isLoggedIn  = this.props.isLoggedIn
        return (<div>
           {isLoggedIn ? 
           <div>
            <button onClick={changeLanguage}>{english? "Español": "English"}</button>
            <Link to="/user/myposts">{t("My Posts")}</Link>
            <Link to="/user/home">{t("Home")}</Link>
            <Link to='/user/updateinfo'>{t("Update")}</Link>
            <Link to="/user/home"><button onClick={this.props.logout}>{t("Log out")}</button> </Link>
            </div>:
            <button onClick={this.props.loginPopup}>{t("Login")}</button>
           }
            
        </div>)
    }
}
export default withTranslation('translation') (Header);