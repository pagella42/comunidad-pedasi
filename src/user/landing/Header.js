import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {
    render() {
        return (<div>
            <Link to="/user/myposts"><div>My Posts</div></Link>
            <Link to="/user"><div>Main page</div></Link>

            
        </div>)
    }
}
export default Header;