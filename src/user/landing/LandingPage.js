import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './LandingPage.css'
class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
		<h2>Welcome to Peddit, We are reddit, but better.</h2>
                <span>Are you a <Link to='/user/home'><span>User</span></Link></span>
                <span> or a site <Link to='/admin'><span>admin</span></Link></span>
		<h5>(We will try our hardest to remember your preferences, we promise.)</h5>
		
            </div>
        )
    }
}
export default LandingPage;
