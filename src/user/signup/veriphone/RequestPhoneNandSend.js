import React, { Component } from "react";
import Axios from "axios";
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
    let status = await Axios.post(
      `http://localhost:4000/verifyPhoneNumber/send`,
      data
    );
    return status;
  };
  // handles the users input, saving it to state
  handleInput = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleInputChange = (e) => {
    this.props.handleInputChange(e)
  }
  // a simple form,
  render() {
    return (
      <div>
        <label htmlFor="">Please confirm your phone number</label>
        <input
          onChange={this.handleInput}
          type="phoneNumber"
          name="phoneNumber"
          value={this.props.phone}
          id=""
        />
        <button onClick={this.sendCode}>Send Verification Code</button>
      </div>
    );
  }
}
export default RequestPhoneNandSend;
