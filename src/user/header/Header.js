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



class Header extends Component {
    constructor() {
        super()
        this.state={
            where: "Home"
        }
    }
    
    home= async ()=>{ await this.setState({where: "Home"})}
    myposts= async ()=>{ await this.setState({where: "My posts"})}
    edit= async ()=>{ await this.setState({where: "Edit my profile"})}
    
    render() {
        let isLoggedIn = this.props.isLoggedIn

        return (
            <div className="header" style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography class="headerwhere" variant="h2" className="title" style={{ flexGrow: 1}}>
                            {this.state.where}
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

// <div>
// {isLoggedIn ?
//     <div id="header">
//         <div id="headercont">
//             <Link id="homeicon" to="/user/home"><FontAwesomeIcon  icon={faHome} /></Link>
//             <Link to="/user/myposts">My Posts</Link>
//             <Link to='/user/updateinfo'>My profile</Link>
//         </div>
//         <div id="headerlogin">
//             <Link class="headerlogbutt" to="/user/home"><div  onClick={this.props.logout}>Log out</div> </Link>
//         </div>
//     </div> :
//     <div id="header">
//         <div id="headercont"></div>
//         <div id="headerlogin">
//         <div class="headerlogbutt" onClick={this.props.loginPopup}>Login</div>
//         </div>
//     </div>
// }

// </div>