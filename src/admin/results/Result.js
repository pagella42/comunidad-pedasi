//single result
//on click calls the route of ResultDetails with a LINK

import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Result extends Component {
    render() {
        return (
            <div>
                <Link to={`'/resultdetails/${"hello"}`}> <div>
                    {this.props.post.category} : 
                    >>>>{this.props.post.title}
                    </div> </Link>

            </div>
            
        )
    }
}
export default Result;