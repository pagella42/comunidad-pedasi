import React, { Component } from "react";
import axios from "axios";
class Update extends Component {
  constructor() {
    super();
    this.state = {
      login: JSON.parse(localStorage.userLogin),
      details: ["name", "address"],
      inputs: {
        name: "",
        address: ""
      }
    };
  }
  update = async () => {
    let data = {
     name: this.state.inputs.name,
     address: this.state.inputs.address,

    }
    console.log(data)

    await axios.put(`http://localhost:4000/data/user/${this.state.login.phone}`, data)


  }
  handleInput = e => {
    let inputs = { ...this.state.inputs };
    inputs[e.target.name] = e.target.value;
    this.setState({ inputs });
  };
  componentDidMount = async () => {
      console.log(this.state.login.phone)
    let userData = await axios.get(`http://localhost:4000/data/user/${this.state.login.phone}`);
    await this.setState({ userData: userData.data });
    console.log("userData: ",this.state.userData);
  };
  render() {
    return (
      <div>
          <div>
        {this.state.userData
          ? this.state.details.map(detail => (
              <div>
                <label htmlFor="">{detail}</label>
                <input
                  type="text"
                  onChange={this.handleInput}
                  value={this.state.inputs[detail]}
                  name={detail}
                  placeholder={this.state.userData[detail]}
                />
              </div>
            ))
          : null}
          </div>
          <button onClick={this.update}>Click Me</button>

      </div>
    );
  }
}
export default Update;
