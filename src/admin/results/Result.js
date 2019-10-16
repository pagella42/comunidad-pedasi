//single result
//on click calls the route of ResultDetails with a LINK

import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Result extends Component {
    render() {
        return (
           <Link data={this.props.c} to='/funca'> <div>{this.props.c.title}</div> /></Link>
            
        )
    }
}
export default Result;