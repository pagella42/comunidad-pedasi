import React, { Component } from "react";
import Axios from "axios";
import Consts from '../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE
class RequestPhoneNandSend extends Component {
  constructor() {
    super();
    this.state = { phoneNumber: "" };
  }
  // Declaring functions
  // sets state.phone in ValidateUserPhone.js to e
  setNumber = e => this.props.setNumber(e);
  //sends phonenumber to server ; returns
  sendCode = async () => {
    let data = { phoneNumber: this.state.phoneNumber };
    this.setNumber(this.state.phoneNumber);
    let status = await Axios.post(CREATE_ROUTE(
      `verifyPhoneNumber/send`),
      data
    );
    return status;
  };
  // handles the users input, saving it to state
  handleInput = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };
  // a simple form,
  render() {
    return (
      <div>
        <label htmlFor="">Please confirm your phone number</label>
        <input
          onChange={this.handleInput}
          type="phoneNumber"
          name="phoneNumber"
          value={this.state.phoneNumber}
          id=""
        />
        <button onClick={this.sendCode}>Send Verification Code</button>
      </div>
    );
  }
}
export default RequestPhoneNandSend;
