import React, { Component } from "react";
import Landing from "./landing/Landing";
import Login from "./Login";

class User extends Component {
  constructor() {
    super();
    this.state = {
      userLogin: { phone: "", isLoggedIn: false }
    };
  }

  login = phone => {
    let userLogin = { phone: phone, isLoggedIn: true };
    this.setState({ userLogin: userLogin });
    localStorage.userLogin = JSON.stringify(userLogin);
  };

  logout = () => {
    let userLogin = { username: "", isLoggedIn: false };
    localStorage.userLogin = userLogin
    this.setState({ userLogin: userLogin });
  };

  componentDidMount() {
    let userLogin;
    if (localStorage.userLogin !== undefined) {
      let isLoggedIn = JSON.parse(localStorage.userLogin).isLoggedIn
      if (isLoggedIn) {
        userLogin = JSON.parse(localStorage.userLogin);
      } else {
        userLogin = this.state.userLogin;
      }
      this.setState({ userLogin: userLogin });
    } else {
      userLogin = this.state.userLogin;
    }
    this.setState({ userLogin: userLogin });
  }

  render() {
    return (
      <div>
        {this.state.userLogin.isLoggedIn ? (
          <div>
            <button onClick={this.logout}>Log out</button>
            <Landing phone={this.state.userLogin.phone} />
          </div>
        ) : (
            <Login login={this.login} />
          )}
      </div>
    );
  }
}

export default User;
