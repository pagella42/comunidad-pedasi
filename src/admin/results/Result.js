import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Result extends Component {
    render() {
        const p = this.props.post
        return (
            <div key={p._id} className="post" >
                <Link to={`/admin/resultdetails/${p._id}`}>{<div id="post" ><h6>{p.title} - {p._id}</h6></div>}</Link>
            </div>)

    }
}
export default Result;