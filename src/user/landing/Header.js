import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {
    render() {
        return (<div>
            <Link to="/user/myposts">My Posts</Link>
            <Link to="/user">Main page</Link>
            <Link to='/user/updateinfo'>Update</Link>

            
        </div>)
    }
}
export default Header;