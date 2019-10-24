import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password:"",
        }
    }
    handleInputChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name] : value}) 
    }

    login = () => {
        this.props.login(this.state.username, this.state.password)
    }
    render() {
        const {t,i18n} = this.props
        return (
            <div>
                <input type="text" placeholder={t("username")} name="username" onChange={this.handleInputChange}/>
                <input type="password" placeholder={t("password")} name="password" onChange={this.handleInputChange} />
                <button onClick={this.login}>{t("Log In")}</button>
            </div>
        );
    }
}

export default withTranslation('translation') (Login);