import React, { Component } from "react";
import Landing from "./landing/Landing";
import Login from "./login/Login";
import Header from './header/Header';


class User extends Component {
  constructor() {
    super();
    this.state = {
      userLogin: { phone: "", isLoggedIn: false },
      
    };
  }

  login = phone => {
    let userLogin = { phone: phone, isLoggedIn: true };
    this.setState({ userLogin: userLogin });
    localStorage.userLogin = JSON.stringify(userLogin);
    this.setState({ loginPopup: false });
  };

  logout = () => {
    let userLogin = { username: "", isLoggedIn: false };
    localStorage.userLogin = JSON.stringify(userLogin)
    this.setState({ userLogin: userLogin });
  };

  componentDidMount() {
    let userLogin
    if (localStorage.userLogin !== undefined) {
      userLogin = JSON.parse(localStorage.userLogin)
    } else {
      userLogin = this.state.userLogin
    }
    this.setState({ userLogin: userLogin })
  }

 

  render() {
    return (
      <div>
        <Header changeLanguage={this.props.changeLanguage} english={this.props.english} logout={this.logout} isLoggedIn={this.state.userLogin.isLoggedIn} loginPopup={this.props.loginPopup} />

        {this.props.loginPopupState ? <Login loginPopup={this.props.loginPopup} login={this.login} /> : null}

      </div>
    );
  }
}

export default User;
