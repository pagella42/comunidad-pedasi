import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {


    render() {
        let isLoggedIn  = this.props.isLoggedIn
        return (<div>
           {isLoggedIn ? 
           <div>
            <Link to="/user/myposts">My Posts</Link>
            <Link to="/user/home">Home</Link>
            <Link to='/user/updateinfo'>Update</Link>
            <Link to="/user/home"><button onClick={this.props.logout}>Log out</button> </Link>
            </div>:
            <button onClick={this.props.loginPopup}>Login</button>
           }
            
        </div>)
    }
}
export default Header;