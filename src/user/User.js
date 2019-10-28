import React, { Component } from "react";
import Landing from "./landing/Landing";
import Login from "./login/Login";
import Header from './header/Header';
import './user.css'


class User extends Component {
  componentDidMount() {
    let userLogin
    if (localStorage.userLogin !== undefined) {
      userLogin = JSON.parse(localStorage.userLogin)
    } else {
      userLogin = this.props.userLogin
    }
    this.setState({ userLogin: userLogin })
  }


  render() {
    return (
      <div>
        <Header 
        changeLanguage={this.props.changeLanguage} 
        english={this.props.english} 
        logout={this.props.logout} 
        isLoggedIn={this.props.userLogin.isLoggedIn} 
        loginPopup={this.props.loginPopup} />
        <div id="bottomheader"></div>

        {this.props.loginPopupState ? <Login loginPopup={this.props.loginPopup} login={this.props.login} /> : null}

      </div>
    );
  }
}

export default User;
