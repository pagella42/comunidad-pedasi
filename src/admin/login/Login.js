import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
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

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password:"",
        }
    }
    handleInputChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name] : value}) 
    }
    displayNoMatch = () => {
        const {t} = this.props
        if (!this.props.match){
            return <div style={{color:"grey"}} >{t("password and username don't match")}</div>
        }
    }

    login = () => {
        this.props.login(this.state.username, this.state.password)
    }
    render() {
        const {t,i18n} = this.props
        return (
           
               <Card  className='logincontainer' style={{ maxWidth: 345 }}>
               <CardContent>
                   <TextField  id="outlined-name" label={t("Username")} name="username" margin="normal"  variant="outlined"  type="string"  onChange={this.handleInputChange}  />
                   <TextField id="outlined-name" type="password" label={t("Password")} margin="normal" name="password"  variant="outlined" onChange={this.handleInputChange} name="password" />
                   {this.displayNoMatch()}
               </CardContent>
               <CardActions>
               {/* <input type="text" placeholder={t("username")} name="username" onChange={this.handleInputChange}/>
                <input type="password" placeholder={t("password")} name="password" onChange={this.handleInputChange} /> */}
                 
                   <Button  size="small" color="primary" onClick={this.login}>{t("Login")} </Button>
               
               </CardActions>
           </Card>
        );
    }
}

export default withTranslation('translation') (Login);