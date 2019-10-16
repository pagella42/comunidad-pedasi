import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/admin/explore">Explore</Link>
        </div>
        <div>
          <Link to="/admin/search">Search</Link>
        </div>
      </div>
    );
  }
}
export default Landing;
