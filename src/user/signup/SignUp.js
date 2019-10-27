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
      isNumberValid: false
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
    let doc = await axios.post(
      "http://localhost:4000/data/user/availability",
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
    axios.post("http://localhost:4000/data/user", this.state.user);
  };

  sendCode = async () => {
    this.setState({ test: true });
    let data = { phoneNumber: this.state.user.phone };
    let status = await axios.post(
      `http://localhost:4000/verifyPhoneNumber/send`,
      data
    );
    console.log(status.data.status)
  };

  handleInput = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  verifycode = async () => {
    let data = {
      phoneNumber: this.state.user.phone,
      code: this.state.pin
    };
    let valid = await axios.post(
      `http://localhost:4000/verifyPhoneNumber/verify`,
      data
    );
    document.getElementById("42").disabled = !valid.data;
    console.log(valid.data);
  };
  myRegex = input => {
    let re = /^\+[0-9]{11}$/;
    return input.match(re);
  };
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
                    />
                  </span>

                  <span>
                    <TextField
                      className="signupinput"
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      label={t("Username")}
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
                      label={t("ID")}
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
                      margin="normal"
                      label={t("E-Mail")}
                      required
                      value={this.state.user.email}
                      onChange={this.handleInputChange}
                      name="email"
                    />
                  </span>
                </div>
                {this.myRegex(this.state.user.phone) ? (
                  <Button
                    variant="outlined"
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
                      variant="outlined"
                      color="primary"
                      type="button"
                      onClick={this.verifycode}
                    >
                      Verify Phone number{" "}
                    </Button>
                  </div>
                ) : null}
                <div>
                  <input class="signupcheck" type="checkbox" required />
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
