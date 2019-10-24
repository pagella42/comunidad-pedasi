import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './login.css'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            phone: "",
            password:'',
        }
    }
    handleInputChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
            
        })
    }

    login = () => {
        this.props.login(this.state.phone)
    }

    loginHandler = () => {
        this.login()
        this.props.loginPopup()
    }

    render() {
        return (
            <div id="logincontainer">
                <div id="logininnercont">
                    <div>
                        <div>Username: </div> <input class="usernamelogin" type="string" placeholder="phone number" name="phone" onChange={this.handleInputChange}  value={this.state.phone}/>
                    </div>
                    <div>
                        <div>National ID: </div><input onChange={this.handleInputChange} name="password" class="passwordlogin" type="password" value={this.state.passwod} placeholder="password" />
                    </div>
                    <Link to="/user/signUp" >Don't have an account? SignUp</Link>

                    <div class="loginbuttcont">

                        <div class="cancellogin" onClick={this.props.loginPopup}><Button style={{ margin: 'theme.spacing(1)' }} variant="outlined" color="inherit">Cancel </Button> </div>
                       
                         {this.state.phone && this.state.password ?
                         <div class="submitlogin" onClick={this.loginHandler}><Button variant="contained" style={{ margin: 'theme.spacing(1)' }}>Log In </Button></div>:
                         <div class="submitlogin" onClick={this.loginHandler}><Button variant="contained" style={{ margin: 'theme.spacing(1)' }} disabled >Log In </Button></div>
                         }
                    </div>

                </div>
            </div>
        );
    }
}

export default Login;