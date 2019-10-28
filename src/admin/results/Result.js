import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Result extends Component {
    render() {
        const p = this.props.post
        return (
            <div key={p._id} className="post" >

                <h6><Link to={`/admin/resultdetails/${p._id}`} target="_blank">{p.title} </Link> - {p.date.slice(0,10)}</h6>

            </div>)
    }
}

export default Result;