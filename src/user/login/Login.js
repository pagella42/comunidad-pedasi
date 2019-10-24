import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';



class Login extends Component {
    constructor(){
        super()
        this.state = {
            phone: "",
        }
    }
    handleInputChange = (event) => {
        let phone = event.target.value
        this.setState({phone : phone}) 
    }

    login = () => {
        this.props.login(this.state.phone)
    }

    loginHandler=()=>{
        this.login()
        this.props.loginPopup()
    }

    render() {
        const{t,i18n}=this.props
        return (
            <div>
                <div onClick={this.props.loginPopup}>X</div>
                <input type="string" placeholder={t("phone number")} name="phone" onChange={this.handleInputChange}/>
                <input type="password" placeholder={t("password")} />
                <button onClick={this.loginHandler}>{t("Log In")}</button>
                <Link to="/user/signUp">{t("Don't have an account? SignUp")}</Link>
            </div>
        );
    }
}

export default withTranslation ('translation') (Login);