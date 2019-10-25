import React, { Component } from "react";
import VerifyCode from "./VerifyCode";
import RequestPhoneNandSend from "./RequestPhoneNandSend";

//this component controls everything
class ValidateUserPhone extends Component {
  constructor() {
    super();
    this.state = {
      phone: null
    };
  }

  setNumber = async number => {
    await this.setState({ phone: number });
  };

  render() {
    return (
      <div>
        {!this.state.phone ? (
          <RequestPhoneNandSend setNumber={this.setNumber} />
        ) : (
          <VerifyCode phone={this.state.phone} />
        )}
      </div>
    );
  }
}
export default ValidateUserPhone;
