import React, { Component } from 'react';
import { stat } from 'fs';
import axios from 'axios';
import TheCodeOfConduct from '../theCodeOfConduct'

class SignUp extends Component {
    constructor(){
        super()
        this.state={
            user:{
                name:"",
                username:"",
                id:"",
                address:"",
                email:"",
                phone:""
            },
            terms:false
        }
    }

    toggleTerms = () =>{
        this.state.terms ?
        this.setState({terms: false}) :
        this.setState({terms:true})
    }

    handleInputChange = e => {
        let{name,value}=e.target
        let user = { ...this.state.user }
        user[name] = value
        this.setState({user})
    }



    verifyUser = async () => {
        let{username,id,email,phone} = this.state.user
        let obj = {username,id,email,phone}
        let doc = await axios.post('http://localhost:4000/data/user/availability',obj)
        if (Object.keys(doc.data).length>0){
            let message = " already in use"
            Object.keys(doc.data).forEach(d => {
                message = `,${d}`.concat(message) 
            }) 
            message[0]===',' ? alert(message.slice(1)) : alert (message)
        }else{
            this.submit()
        }
    }

    submit = () =>{
        axios.post('http://localhost:4000/data/user',this.state.user)
    }
    render() {
        return (
            <div id='sign-up'>
                <h4>Sign Up</h4>
                <form>
                    <div><span>Full Name<input required value= {this.state.user.name} onChange= {this.handleInputChange}  name='name'></input>*</span></div>
                    <div><span>Username<input required value= {this.state.user.username} onChange= {this.handleInputChange}  name='username'></input>*</span></div>
                    <div><span>ID<input required value= {this.state.user.id} onChange= {this.handleInputChange}  name='id'></input>*</span></div>
                    <div><span>Address<input value= {this.state.user.address} onChange= {this.handleInputChange}  name='address'></input></span></div>
                    <div><span>E-Mail<input value= {this.state.user.email} onChange= {this.handleInputChange}  name='email'></input></span></div>
                    <div><span>Phone Number<input required value= {this.state.user.phone} onChange= {this.handleInputChange}  name='phone'></input>*</span></div>
                    <div><input type='checkbox' required/>I agree to the <span style={{color:'blue',cursor:'alias'}} onClick={this.toggleTerms} >Terms and Conditions</span></div>
                    <div>*=Required</div>
                    <input type='submit' onSubmit={this.verifyUser} value='submit'/> 
                </form>
                <TheCodeOfConduct terms = {this.state.terms}
                    toggleTerms = {this.toggleTerms} />
            </div>
        );
    }
}

export default SignUp;