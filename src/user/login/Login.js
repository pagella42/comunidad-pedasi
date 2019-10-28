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
import { async } from 'q';
import Consts from '../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE

class Login extends Component {
    constructor() {
        super()
        this.state = {
            user:{
                username: "",
                ID: '',
            },
            noMatch:false
        }
    }
    handleInputChange = (event) => {
        let user = {...this.state.user}
        user[event.target.name]=event.target.value
        this.setState({user})
    }
    verify = async() =>{
        let verify = await axios.post(CREATE_ROUTE('data/user/verify'),this.state.user)
        return verify.data 
    }
    displayNoMatch = () =>{
        return <div>username and id dont match</div>
    }

    loginHandler =async () => {
        let user = await this.verify()
        if(user){
            this.props.login(user.phone)
            this.props.loginPopup()
        }else{this.setState({noMatch:true})}
    }

    render() {
        const{t,i18n}=this.props
        return (

            <Card  className='logincontainer' style={{ maxWidth: 345 }}>
                <CardContent>
                    <TextField  id="outlined-name" label="Username" margin="normal"  variant="outlined"  type="string" name="username" onChange={this.handleInputChange}  value={this.state.user.username} />
                    <TextField id="outlined-name" label="National ID" margin="normal" variant="outlined" onChange={this.handleInputChange} name="ID" value={this.state.user.ID} />
                    {this.state.noMatch? this.displayNoMatch(): null}
                   <div><Link onClick={this.props.loginPopup} to="/user/signUp" >Don't have an account? SignUp</Link></div> 
                </CardContent>
                <CardActions>
                {this.state.user.username && this.state.user.ID ?
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