import React, { Component } from "react";
import axios from "axios";
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { TextField, Card, CardActions } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import './update.css'

class Update extends Component {
  constructor() {
    super();
    this.state = {
      login: JSON.parse(localStorage.userLogin),
      details: ["name", "address", "ID", "email"],
      inputs: {
        name: "",
        address: "",
        phone: "",
        ID: "",
        email: ""
      },
      pin: null
    };
  }

  update = async () => {
    let data = this.state.inputs
    await axios.put(`http://localhost:4000/data/user/${this.state.login.phone}`, data)
  }
  handlePin = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleInput = e => {
    let inputs = { ...this.state.inputs };
    inputs[e.target.name] = e.target.value;
    this.setState({ inputs }, () => {
      this.state.inputs.phone == '' ?
        document.getElementById('edit-verify').disabled = false :
        document.getElementById('edit-verify').disabled = true
      console.log(document.getElementById('edit-verify').disabled)
    });
  };
  componentDidMount = async () => {
    let userData = await axios.get(`http://localhost:4000/data/user/${this.state.login.phone}`);
    console.log(userData.data)
    await this.setState({ userData: userData.data });
  };

  sendCode = async () => {

    let data = { phoneNumber: this.state.inputs.phone };
    let status = await axios.post(
      `http://localhost:4000/verifyPhoneNumber/send`,
      data
    );
    return status;
  };

  verifycode = async () => {
    let data = {
      phoneNumber: this.state.inputs.phone,
      code: this.state.pin
    };
    let valid = await axios.post(
      `http://localhost:4000/verifyPhoneNumber/verify`,
      data
    );
    document.getElementById("edit-verify").disabled = !valid.data
    // console.log(valid.data);

  };
  render() {
    const { t, i18n } = this.props
    return (
      <Container maxWidth="sm">
        <Card>
          <CardContent className="cardContent">
            <div className="updateFields">
              {this.state.userData ?
                this.state.details.map(detail => (
                  <div
                  >
                    <TextField
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      label={t(detail)}
                      type="text"
                      onChange={this.handleInput}
                      value={this.state.inputs[detail]}
                      name={detail}
                      placeholder={t(this.state.userData[detail])}
                    />
                  </div>
                ))
                : null}
            </div>
            <div className="verifyFieldsContainer">
              <div className="verifyFields">
                <div>
                  <TextField
                    required
                    id="outlined-name"
                    margin="normal"
                    variant="outlined"
                    label={t("Phone Number")}
                    value={this.state.inputs.phone}
                    onChange={this.handleInput}
                    name="phone"
                  />

                </div>
                <div className="secondaryButton">
                  <Button
                    value="Validate Number"
                    variant="contained" color="secondary"
                    onClick={this.sendCode}
                  >{t("Validate Number")}</Button>

                </div>
              </div>


              <div className="verifyFields">
                <div>

                  <TextField
                    required
                    id="outlined-name"
                    margin="normal"
                    variant="outlined"
                    label={t("Verify Pin")}
                    value={this.state.pin}
                    onChange={this.handlePin}
                    name="pin"

                  />

                </div>
                <div className="secondaryButton">
                  <Button

                    value="Validate"
                    variant="contained" color="secondary"
                    onClick={this.verifycode}
                  >{t("Validate")}</Button>

                </div>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button color="primary" id='edit-verify' onClick={this.update}>{t("Update")}</Button>

          </CardActions>
        </Card>
      </Container>
    );
  }
}
export default withTranslation('translation')(Update);
