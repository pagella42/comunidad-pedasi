import React, { Component } from "react";
import Axios from "axios";
import Consts from '../../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE
// This component uses twelio server routes to validate the users pin code
class VerifyCode extends Component {
  constructor() {
    super();
    this.state = {
      code: ""
    };
  }

  verifycode = async () => {
    let data = {
      phoneNumber: this.props.phone[0],
      code: this.state.code
    };
    let valid = await Axios.post(CREATE_ROUTE
      (`verifyPhoneNumber/verify`),
      data
    );
    console.log(valid.data);
  };
  handleInput = e => this.setState({ [e.target.name]: [e.target.value] });
  render() {
    return (
      <div>
        <label htmlFor="">Please enter the code</label>
        <input
          onChange={this.handleInput}
          type="text"
          name="code"
          value={this.state.code}
          id=""
        />
        <button onClick={this.verifycode}>Send Verification Code</button>
      </div>
    );
  }
}
export default VerifyCode;
