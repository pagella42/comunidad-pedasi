import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
    
    render() {
        let isLoggedIn = JSON.parse(localStorage.adminLogin).isLoggedIn
        return (<div>

            <AppBar position="static">
                <Toolbar>

                    <Typography class="headerwhere" variant="h2" className="title" style={{ flexGrow: 1 }}>
                        Administrador
                    </Typography>
                    {isLoggedIn ?

                        <div class='headcont'>
                            <Link onClick={this.home} to="/admin" style={{ textDecoration: 'none', color: 'white' }}> <Button color="inherit"> <div class="iconheader"><FontAwesomeIcon icon={faHome} /></div> </Button> </Link>
                          {this.props.home ? <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin"><Button onClick={this.props.logout} color="inherit">Log Out</Button></Link>: null}  
                        </div> :

                        <div class="loginbuttcont"><Button onClick={this.props.loginPopup} color="inherit">Login</Button> </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
        )
    }
}
export default Header;