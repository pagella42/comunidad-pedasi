import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class Result extends Component {
    render() {
        const p = this.props.post
        const { t, i18n } = this.props
        return (
            <div key={p._id} className="post" >

                <h6><Link to={`/admin/resultdetails/${p._id}`} target="_blank">{t(p.title)} </Link> - {p.date.slice(0,10)}</h6>

            </div>)
    }
}

export default withTranslation('translation')(Result)
