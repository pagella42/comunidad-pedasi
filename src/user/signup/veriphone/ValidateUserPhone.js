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
          <RequestPhoneNandSend phone={this.props.phone} handleInputChange={this.props.handleInputChange} setNumber={this.changeState} />
        ) : (
          <VerifyCode sms={this.props.sms} phone={this.state.phone} />
        )}
      </div>
    );
  }
}
export default ValidateUserPhone;
