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
import axios from 'axios'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            ID: '',
        }
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value

        })
    }
    verify = () =>{
        axios.post('http://localhost:4000/data/user/verify',this.state)
        .then((err,res)=>{
            console.log(res)
        })
    }
    login = () => {
        this.verify()
        this.props.login(this.state.username)
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
                    <TextField  id="outlined-name" label="Username" margin="normal"  variant="outlined"  type="string" name="username" onChange={this.handleInputChange}  value={this.state.username} />
                    <TextField id="outlined-name" label="National ID" margin="normal" variant="outlined" onChange={this.handleInputChange} name="ID" value={this.state.passwod} />
                   <div><Link onClick={this.props.loginPopup} to="/user/signUp" >Don't have an account? SignUp</Link></div> 
                </CardContent>
                <CardActions>
                {this.state.username && this.state.ID ?
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