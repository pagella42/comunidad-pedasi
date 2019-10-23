import React, { Component } from "react";
import Landing from "./landing/Landing";
import Login from "./Login";
import Header from './Header';


class User extends Component {
  constructor() {
    super();
    this.state = {
      userLogin: { phone: "", isLoggedIn: false },
      loginPopup: false,
    };
  }

  login = phone => {
    let userLogin = { phone: phone, isLoggedIn: true };
    this.setState({ userLogin: userLogin });
    localStorage.userLogin = JSON.stringify(userLogin);
  };

  logout = () => {
    let userLogin = { username: "", isLoggedIn: false };
    debugger
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
loginPopup=()=>{
  this.setState({
    loginPopup: !this.state.loginPopup
  })
}

  render() {
    return (
      <div>
      <Header isLoggedIn={this.state.userLogin.isLoggedIn} loginPopup={this.loginPopup}/>
    
      {/* //   {this.state.userLogin.isLoggedIn ? (
      //     <div>
      //       <button onClick={this.logout}>Log out</button>
      //       <Landing phone={this.state.userLogin.phone} />
      //     </div>
      //   ) : (
      //       <Login login={this.login} />
      //     )}
      // </div>
       */}
          <Landing  phone={this.state.userLogin.phone} />
    </div>
    );
  }
}

export default User;
