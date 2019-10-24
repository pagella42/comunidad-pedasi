import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class Landing extends Component {
  render() {
    const {t,i18n} = this.props
    return (
      <div>
        <div>
          <Link to="/admin/explore">{t("Explore")}</Link>
        </div>
        <div>
          <Link to="/admin/search">{t("Search")}</Link>
        </div>

      </div>
    );
  }
}
export default withTranslation('translation') (Landing);
