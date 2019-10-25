import React, { Component } from "react";
import axios from "axios";
import { withTranslation } from 'react-i18next';

class Update extends Component {
  constructor() {
    super();
    this.state = {
      login: JSON.parse(localStorage.userLogin),
      details: ["name", "address","ID", "email"],
      inputs: {
        name: "",
        address: "",
        phone:"",
        ID:"",
        email:""
      },
      pin:null
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
    this.setState({ inputs },()=>{
      this.state.inputs.phone==''?
      document.getElementById('edit-verify').disabled=false:
      document.getElementById('edit-verify').disabled=true
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
    const {t,i18n} = this.props
    return (
      <div>
          <div>
        {this.state.userData ? 
          this.state.details.map(detail => (
            <div>
                <label htmlFor="">{t(detail)}</label>
                <input
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
          <div>
            <span>
              {t("Phone Number")}
              <input
                required
                value={this.state.inputs.phone}
                onChange={this.handleInput}
                name="phone"
              ></input>
              *
            </span>
            <input
              type="button"
              value="Validate Number"
              onClick={this.sendCode}
            />
          </div>

          <div>
            <span>
              {t("Verify Pin")}
              <input
                required
                value={this.state.pin}
                onChange={this.handlePin}
                name="pin"
              ></input>
              *
            </span>
            <input
              type="button"
              value="Validate"
              onClick={this.verifycode}
            />
          </div>
          <button id='edit-verify' onClick={this.update}>{t("Update")}</button>

      </div>
    );
  }
}
export default withTranslation('translation') (Update);
