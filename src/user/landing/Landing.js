import React, { Component } from 'react';
import Feed from './feed/Feed';
import Login from '../../admin/login/Login';
class Landing extends Component {
    
    render() {
        return (<div>
            
            
            <Feed loginPopup={this.props.loginPopup} isLoggedIn={JSON.parse(localStorage.userLogin).isLoggedIn} phone={JSON.parse(localStorage.userLogin).phone}/>
        </div>)
    }
}
export default Landing;