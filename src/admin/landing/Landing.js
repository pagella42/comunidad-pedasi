import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class Landing extends Component {
  render() {
    const {t,i18n} = this.props
    return (
      <div>
          <Link to="/admin/explore">{t("Explore")}</Link>
          <Link to="/admin/search">{t("Search")}</Link>
      </div>
    )
  }
}
export default withTranslation('translation') (Landing);
