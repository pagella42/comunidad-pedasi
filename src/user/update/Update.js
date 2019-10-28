import React, { Component } from "react";
import axios from "axios";
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { TextField, Card, CardActions } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import './update.css'

import Consts from '../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE
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
    await axios.put(CREATE_ROUTE(`data/user/${this.state.login.phone}`), data)
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
    });
  };
  componentDidMount = async () => {
    let userData = await axios.get(CREATE_ROUTE(`data/user/${this.state.login.phone}`));
    await this.setState({ userData: userData.data });
  };

  sendCode = async () => {

    let data = { phoneNumber: this.state.inputs.phone };
    let status = await axios.post(
      CREATE_ROUTE(`verifyPhoneNumber/send`),
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
      CREATE_ROUTE(`verifyPhoneNumber/verify`),
      data
    );
    document.getElementById("edit-verify").disabled = !valid.data

  };
  render() {
    const { t, i18n } = this.props
    return (
      <Container className="updateContainer" maxWidth="sm">
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
