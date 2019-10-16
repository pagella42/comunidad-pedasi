//single result
//on click calls the route of ResultDetails with a LINK

import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Result extends Component {
    render() {
        return (
           <Link to={`'/resultdetails/${this.props.post.id}`}> <div>{this.props.post.title}</div> /></Link>
            
        )
    }
}
export default Result;