import React, { Component } from "react";
import axios from "axios";
import TheCodeOfConduct from "./theCodeOfConduct";

import { withTranslation } from "react-i18next";
import Success from "../Success";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
            redirect: false //pass down to loading screen
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
	this.setState({test: true })
        let data = { phoneNumber: this.state.user.phone };
        let status = await axios.post(
            `http://localhost:4000/verifyPhoneNumber/send`,
            data
        );
        return status;
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
    render() {
        const { t, i18n } = this.props;
        return (
            <div id="sign-up">
                <h4>{t("Sign Up")}</h4>
                <form onSubmit={this.verifyUser}>
                    {this.renderLoading()}
                    <div>
                        <span>
                            <TextField
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
                    </div>
                    <div>
                        <span>
                            <TextField
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
                    </div>
                    <div>
                        <span>
                            <TextField
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
                                id="outlined-name"
                                margin="normal"
                                variant="outlined"
                                label={t("E-Mail")}
                                required
                                value={this.state.user.email}
                                onChange={this.handleInputChange}
                                name="email"
                            />
                        </span>
                    </div>
                    <div>
                        <span>
                            <TextField
                                id="outlined-name"
                                margin="normal"
                                variant="outlined"
                                label={t("Phone Number")}
                                required
                                value={this.state.user.phone}
                                onChange={this.handleInputChange}
                                name="phone"
                            />
                        </span>
				<Button
					variant="outlined"
					color="primary"
					type="button"
					onClick={this.sendCode}
				>
					Send Verification Code
				</Button>
                    </div>


                    <div>
                        <span>
                            <TextField
                                id="outlined-name"
                                margin="normal"
                                variant="outlined"
                                label={t("Enter Verification code")}
                                required
                                value={this.state.pin}
                                onChange={this.handleInput}
                                name="pin"
                            />
                        </span>
			{this.state.test ?
				<Button
					variant="outlined"
					color="primary"
					type="button"
					onClick={this.verifycode}
				>
					Verify Phone number
				</Button> : null
			}
                    </div>
                    <div>
                        <input type="checkbox" required />
                        {t("I agree to the")}{" "}
                        <span
                            style={{ color: "blue", cursor: "alias" }}
                            onClick={this.toggleTerms}
                        >
                            {t("Terms and Conditions")}
                        </span>
                    </div>
                    <Button variant="outlined" id="42" type="submit">
                        {t("submit")}
                    </Button>
                </form>
                <TheCodeOfConduct
                    terms={this.state.terms}
                    toggleTerms={this.toggleTerms}
                />
            </div>
        );
    }

}

export default withTranslation("translation")(SignUp);
