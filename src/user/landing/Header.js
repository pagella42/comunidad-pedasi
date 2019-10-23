import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {


    render() {
        let isLoggedIn  = this.props.isLoggedIn
        return (<div>
           { isLoggedIn ? 
           <div>
            <Link to="/user/myposts">My Posts</Link>
            <Link to="/user">Main page</Link>
            <Link to='/user/updateinfo'>Update</Link> 
            </div>:
            <div onClick={this.props.loginPopup}>LogIn</div>
           }
            
        </div>)
    }
}
export default Header;