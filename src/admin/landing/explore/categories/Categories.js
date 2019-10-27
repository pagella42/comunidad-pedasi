import React, { Component } from "react";
import Category from "./Category";
import axios from 'axios'
import { withTranslation } from 'react-i18next';
import './categories.css'

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Consts from '../../../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount = async () => {
    let data = await axios.get(CREATE_ROUTE(`data/categories/`)
    )
    let allCategories = data.data
    let categories = this.state.categories

    allCategories.map(c => c.name).forEach(category => {
      categories.push(category)
      this.setState({ categories })
    });




  }
  render() {
    const { t, i18n } = this.props
    return (
      <div id="categoriescont">
        <div><h1 class="categoriestitle">Categories:</h1></div>
        <div id="categoriesinnercont">
          {this.state.categories.map(c => {
            return (<div className="categorycont">
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography ><div>{t(c)}</div></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <Category category={c} />

                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>)

          })}

        </div></div>
    );
  }
}
export default withTranslation('translation')(Categories);
