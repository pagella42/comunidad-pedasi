import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import './landing.css'
class Landing extends Component {
  render() {
    const {t,i18n} = this.props
    return (
      
      <div id="landingcont">
        <div>
       <Link style={{textDecoration: 'none', color: 'black'}} to="/admin/explore">
          <Button className="landingbutt" variant="outlined" >

          <div className="landingbutttext">{t("Explore")}</div>
       </Button></Link>
        </div>

        <div>
       <Link style={{textDecoration: 'none', color: 'black'}} to="/admin/search"> 
       <Button className="landingbutt" variant="outlined" >
          <div className="landingbutttext">{t("Search")}</div>

  </Button></Link>
        </div>

      </div>
    );
  }
}
export default withTranslation('translation') (Landing);
