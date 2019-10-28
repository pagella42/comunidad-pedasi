import React, { Component } from "react";
import axios from "axios";
import TheCodeOfConduct from "./theCodeOfConduct";
import "./signup.css";

import { withTranslation } from "react-i18next";
import Success from "../Success";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Consts from '../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      test: false,
      pin: null,
      user: {
        name: "",
        username: "",
        ID: "",
        address: "",
        email: "",
        phone: ""
      },
      terms: false,
      load: false /**loading screen */,
      redirect: false, //pass down to loading screen
      isNumberValid: false,
      isCodeValid: false,
    };
  }

  useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: "none"
    }
  }));

  setLoading = () => {
    this.setState({ load: true });
  };
  renderLoading = () => {
    if (this.state.load) {
      return <Success redirect={this.state.redirect} />;
    }
  };
  toggleTerms = () => {
    this.state.terms
      ? this.setState({ terms: false })
      : this.setState({ terms: true });
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    let user = { ...this.state.user };
    user[name] = value;
    this.setState({ user });
  };

  verifyUser = async event => {
    const { t, i18next } = this.props;
    event.preventDefault();
    let { username, ID, email, phone } = this.state.user;
    let obj = { username, ID, email, phone };
    let doc = await axios.post(CREATE_ROUTE(
      "data/user/availability"),
      obj
    );
    if (Object.keys(doc.data).length > 0) {
      let message = ` ${t("already in use")}`;
      Object.keys(doc.data).forEach(d => {
        message = `,${t(d)}`.concat(message);
      });
      message[0] === "," ? alert(message.slice(1)) : alert(message);
    } else {
      this.submit();
      this.setLoading();
    }
  };

  submit = () => {
    axios.post(CREATE_ROUTE("data/user"), this.state.user);
  };

  sendCode = async () => {

      let data = { phoneNumber: this.state.user.phone };
      let status = await axios.post(CREATE_ROUTE(
          `verifyPhoneNumber/send`),
          data
          );
        
          status ? this.setState({ test: true }) : console.log("error goes here") // < ignore this
        this.setState({ test: true })
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  verifycode = async () => {
    let data = {
      phoneNumber: this.state.user.phone,
      code: this.state.pin
    };
    let valid = await axios.post(CREATE_ROUTE(
      `verifyPhoneNumber/verify`),
      data
    );
    document.getElementById("42").disabled = !valid.data;
    await this.setState({isCodeValid: valid.data})
    await this.setState({buttonClicked: true})
    
  };
  myRegex = input => {
    let re = /^\+[0-9]{11}$/;
    return input.match(re);
  };
  onInvalid = () => {

  }

  onValid = () => {
    return this.state.isCodeValid ? <p>Code entered is valid, please complete form, and agree to the terms of servive to complete your registration</p> 
		  : 
     <p>Code entered is invalid, try again.</p> 
  }
  
  
  render() {
    const { t, i18n } = this.props;
    return (
      <div id="signupcontainer">
        <Card className="signup" style={{ maxWidth: 1200 }}>
          <CardContent>
            <div id="sign-up">
              <h4>{t("Sign Up")}</h4>
              <form onSubmit={this.verifyUser}>
                {this.renderLoading()}
                <div>
                  <span>
                    <TextField
                      className="firstinput signupinput"
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      label={t("Full Name")}
                      required
                      value={this.state.user.name}
                      onChange={this.handleInputChange}
                      name="name"
                      placeholder= "Jose Gonzalez"
                    />
                  </span>

                  <span>
                    <TextField
                      className="signupinput"
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      label={t("Username")}
                      placeholder= "jose1999"
                      required
                      value={this.state.user.username}
                      onChange={this.handleInputChange}
                      name="username"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <TextField
                      className="firstinput signupinput"
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      label="Document of Identity"
                      required
                      value={this.state.user.ID}
                      onChange={this.handleInputChange}
                      name="ID"
                      
                      
                    />
                  </span>

                  <span>
                    <TextField
                      className="signupinput"
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      label={t("Address")}
                      required
                      value={this.state.user.address}
                      onChange={this.handleInputChange}
                      name="address"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <TextField
                      className="firstinput signupinput"
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      label={"Phone"}
                      required
                      value={this.state.user.phone}
                      onChange={this.handleInputChange}
                      name="phone"
                      placeholder='+50734837483'
                      variant="outlined"
                      
                    />
                  </span>
                  <span>
                    <TextField
                      className="signupinput"
                      id="outlined-name"
                      variant="outlined"
                      margin="normal"
                      label={t("E-Mail")}
                      required
                      value={this.state.user.email}
                      onChange={this.handleInputChange}
                      placeholder= "myemail@gmail.com"
                      name="email"
                    />
                  </span>
                </div>
                {this.myRegex(this.state.user.phone) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={this.sendCode}
                  >
                    Send Code
                  </Button>
                ) : null}

                {this.state.test ? (
                  <div>
                    <div>
                    <h3>`Verification Message  to {this.state.user.phone}`</h3>

                      <span>
                        <TextField
                          className="firstinput signupinput"
                          id="outlined-name"
                          margin="normal"
                          variant="outlined"
                          label="Verification code"
                          required
                          value={this.state.pin}
                          onChange={this.handleInput}
                          name="pin"
                        />
                      </span>
                    </div>
                    <Button
                      className="verificationbutton"
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={this.verifycode}
                    >
                      Verify Phone number{" "}
                    </Button>
                    {this.state.buttonClicked ? this.onValid() : null} 
                  </div>
                ) : null}
                <div>
                  <input className="signupcheck" type="checkbox" required />
                  {t("I agree to the")}{" "}
                  <span
                    style={{ color: "blue", cursor: "alias" }}
                    onClick={this.toggleTerms}
                  >
                    {t("Terms and Conditions")}
                  </span>
                </div>
              </form>
              <TheCodeOfConduct
                terms={this.state.terms}
                toggleTerms={this.toggleTerms}
              />
            </div>
            <input
              disabled
              variant="outlined"
              id="42"
              type="submit"
              value={t("submit")}
            />
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </div>
    );
  }
}

export default withTranslation("translation")(SignUp);
