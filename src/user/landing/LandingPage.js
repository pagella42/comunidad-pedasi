import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './LandingPage.css'
import Fab from '@material-ui/core/Fab';



class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landinginner">

		<h1 style={{fontSize: "4em", fontWeight: "lighter"}}>Comunidad Pedasí</h1>
      <Link to="/user/home" style={{textDecoration: 'none',}}>  <Fab color="primary" id="home" variant="extended" aria-label="language" size="large" onClick={this.changeLanguage}>Go to Home</Fab></Link>
                </div>


		
            </div>
        )
    }
}
export default LandingPage;
