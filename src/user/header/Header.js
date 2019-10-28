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
        const { t, i18n } = this.props

        return (
            <div className="header" style={{ flexGrow: 1 }}>
            {/* <button onClick={changeLanguage}>{english? "Español": "English"}</button> */}
                <AppBar position="static">
                    <Toolbar>

                        <Typography className="headerwhere" variant="h2" className="title" style={{ flexGrow: 1}}>
                          
                        </Typography>
                        {isLoggedIn ?

                            <div className='headcont'>
                            <Link onClick={this.home} to="/user/home" style={{textDecoration: 'none', color: 'white'}}> <Button color="inherit"> <div className="iconheader"><FontAwesomeIcon icon={faHome}/></div> </Button> </Link>
                            <Link onClick={this.myposts} to="/user/myposts" style={{textDecoration: 'none', color: 'white'}}><Button color="inherit"> <div className="headericonsmall iconheader"><FontAwesomeIcon icon={faUser}/> </div><div className="headericonbig">{t("My posts")}</div></Button></Link>
                            <Link onClick={this.edit} to='/user/updateinfo' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit"><div className="headericonsmall iconheader"><FontAwesomeIcon icon={faPencilAlt}/></div><div className="headericonbig">{t("My info")}</div></Button></Link>
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/user/home"><Button onClick={this.props.logout} color="inherit">{t("Logout")}</Button></Link>
                            </div>:
                            
                            <div className="loginbuttcont"><Button onClick={this.props.loginPopup} color="inherit">{t("Login")}</Button> </div>
                        }
                    </Toolbar>
                </AppBar>
           
            </div>

        )
    }
}
export default withTranslation('translation')(Header);



