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

  changeState = async number => {
    await this.setState({ phone: number });
  };

  render() {
    return (
      <div>
        {!this.state.phone ? (
          <RequestPhoneNandSend setNumber={this.changeState} />
        ) : (
          <VerifyCode phone={this.state.phone} />
        )}
      </div>
    );
  }
}
export default ValidateUserPhone;
