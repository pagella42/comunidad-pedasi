import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Result extends Component {
    render() {
        const p = this.props.post
        return (
            <div key={p._id} className="post" >
                <Link to={`/admin/resultdetails/${p._id}`} target="_blank">{
                    <h5 id="post" >
                        <span>{p.title}</span>
                        <span> - ({p._id})</span>
                        <span> - {p.date}</span>
                    </h5>
                }</Link>
            </div>)
    }
}

export default Result;