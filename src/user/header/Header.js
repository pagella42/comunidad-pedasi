import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';






class Header extends Component {
    constructor() {
        super()
        this.state={
        }
    }
    
    
    render() {

        let isLoggedIn = this.props.isLoggedIn

        return (
            <div className="header" style={{ flexGrow: 1 }}>
            {/* <button onClick={changeLanguage}>{english? "Español": "English"}</button> */}
                <AppBar position="static">
                    <Toolbar>

                        <Typography class="headerwhere" variant="h2" className="title" style={{ flexGrow: 1}}>
                          
                        </Typography>
                        {isLoggedIn ?

                            <div class='headcont'>
                            <Link onClick={this.home} to="/user/home" style={{textDecoration: 'none', color: 'white'}}> <Button color="inherit"> <div class="iconheader"><FontAwesomeIcon icon={faHome}/></div> </Button> </Link>
                            <Link onClick={this.myposts} to="/user/myposts" style={{textDecoration: 'none', color: 'white'}}><Button color="inherit"> <div class="headericonsmall iconheader"><FontAwesomeIcon icon={faUser}/> </div><div class="headericonbig">My posts</div></Button></Link>
                            <Link onClick={this.edit} to='/user/updateinfo' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit"><div class="headericonsmall iconheader"><FontAwesomeIcon icon={faPencilAlt}/></div><div class="headericonbig">My info</div></Button></Link>
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/user/home"><Button onClick={this.props.logout} color="inherit">Log Out</Button></Link>
                            </div>:
                            
                            <div class="loginbuttcont"><Button onClick={this.props.loginPopup} color="inherit">Login</Button> </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>

        )
    }
}
export default Header;


