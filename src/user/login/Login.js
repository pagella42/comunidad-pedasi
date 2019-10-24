import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './login.css'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withTranslation } from 'react-i18next';



class Login extends Component {
    constructor() {
        super()
        this.state = {
            phone: "",
            password: '',
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
        const{t,i18n}=this.props
        return (

            <Card  className='logincontainer' style={{ maxWidth: 345 }}>
                <CardContent>
                    <TextField  id="outlined-name" label="Username" margin="normal"  variant="outlined"  type="string" name="phone" onChange={this.handleInputChange}  value={this.state.phone} />
                    <TextField id="outlined-name" label="National ID" margin="normal" variant="outlined" onChange={this.handleInputChange} name="password" value={this.state.passwod} />
                   <div><Link to="/user/signUp" >Don't have an account? SignUp</Link></div> 
                </CardContent>
                <CardActions>
                {this.state.phone && this.state.password ?
                    <Button size="small" color="primary" onClick={this.loginHandler}>Login </Button>:
                    <Button disabled size="small" color="primary"  onClick={this.loginHandler}>Login </Button>
                }
                    <Button onClick={this.props.loginPopup} size="small" color="primary"> Cancel</Button>
                </CardActions>
            </Card>
         
        );
    }
}

export default withTranslation ('translation') (Login);