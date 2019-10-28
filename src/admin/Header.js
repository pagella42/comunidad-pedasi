import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

class Header extends Component {

    render() {
        const { t, i18n, changeLanguage, english } = this.props
        let isLoggedIn = localStorage.adminLogin !== undefined ? JSON.parse(localStorage.adminLogin).isLoggedIn : false
        return (<div>
            <AppBar position="static">
                <Toolbar>
                    <Typography className="headerwhere" variant="h4" className="title" style={{ flexGrow: 1 }}>
                        {t("Manager")}
                    </Typography>
                    {isLoggedIn ?

                        <div className='headcont'>
                            <Link onClick={this.home} to="/admin" style={{ textDecoration: 'none', color: 'white' }}> <Button color="inherit"> <div className="iconheader"><FontAwesomeIcon icon={faHome} /></div> </Button> </Link>
                          {this.props.home ? <Link style={{ textDecoration: 'none', color: 'white' }} to="/admin"><Button onClick={this.props.logout} color="inherit">{t("Logout")}</Button></Link>: null}  
                        </div> :

                        <div className="loginbuttcont"><Button onClick={this.props.loginPopup} color="inherit">{t("Login")}</Button> </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
        )
    }
}
export default withTranslation ('translation') (Header);