import React, { Component } from "react";
import axios from "axios";
import './filter.css'
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withTranslation } from 'react-i18next';
import Consts from '../../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      sort: "dh",
      filter: {
        sort: {
          by: "date",
          order: -1
        },
        category: "",
        status: "",
        language: ""
      },
      categories: [],
    };
  }
  filter = async () => {

    let filter = { ...this.state.filter };
    switch (this.state.sort) {
      case "dh":
        filter.sort.by = "date";
        filter.sort.order = -1;

        break;
      case "dl":
        filter.sort.by = "date";
        filter.sort.order = 1;

        break;
      case "ph":
        filter.sort.by = "points";
        filter.sort.order = -1;

        break;
      case "pl":
        filter.sort.by = "points";
        filter.sort.order = 1;

        break;
      default:
        filter.sort.by = "date";
        filter.sort.order = -1;
        break;
    }
    this.props.updateFilter(filter, ()=> {
      this.props.getPosts();
    })
  };

  updateSort = async event => {
    await this.setState({
      [event.target.name]: event.target.value
    });
  };

  update = async event => {
    let filter = this.state.filter;
    filter[event.target.name] = event.target.value;

    await this.setState({
      filter: filter
    });
  };

  getCategories = async () => {
    let response = await axios.get(CREATE_ROUTE('data/categories'))
    let categories = response.data.map(p => p.name)
    await this.setState({ categories })

  }

  componentDidMount = () => {
    this.getCategories()
  }
  render() {
    const {t,i18n}=this.props
    return (
      <div id="filtercontainer">
        <FormControl  variant="outlined" >
          <InputLabel  htmlFor="outlined-sort-simple">  {t("Sort by")}  </InputLabel>
          <Select name="sort" onChange={this.updateSort} value={this.state.sort}  labelWidth={55}  inputProps={{ name: 'sort', id: 'outlined-sort-simple', }} >
            <MenuItem value='dh'>{t("Date high to low")}</MenuItem>
            <MenuItem value='dl'>{t("Date low to high")}</MenuItem>
            <MenuItem value='ph'>{t("Likes high to low")}</MenuItem>
            <MenuItem value='pl'>{t("Likes low to high")}</MenuItem>
          </Select>
        </FormControl>
       
        <FormControl variant="outlined" >
          <InputLabel htmlFor="outlined-sort-simple">  {t("Categories")} </InputLabel>
          <Select name="category" onChange={this.update} value={this.state.filter.category} labelWidth={75}  inputProps={{ name: 'category', id: 'outlined-category-simple', }} >
            <MenuItem value='All'>{t("All")}</MenuItem>
             {this.state.categories.map(c => <MenuItem value={c}>{t(c)}</MenuItem>)}
          </Select>
        </FormControl>
        
        <FormControl variant="outlined" >
          <InputLabel  htmlFor="outlined-sort-simple"> {t("Status")} </InputLabel>
          <Select name="status" onChange={this.update} value={this.state.filter.status} labelWidth={55}  inputProps={{ name: 'status', id: 'outlined-status-simple', }} >
            <MenuItem value='All'>{t("All")}</MenuItem>
            <MenuItem value='pending'>{t("Pending")}</MenuItem>
            <MenuItem value='in progress'>{t("In progress")}</MenuItem>
            <MenuItem value='resolved'>{t("Resolved")}</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" >
          <InputLabel  htmlFor="outlined-sort-simple"> {t("Language")} </InputLabel>
          <Select   name="language" onChange={this.update} value={this.state.filter.language} labelWidth={70}  inputProps={{ name: 'language', id: 'outlined-language-simple', }} >
            <MenuItem value='All'>{t("All")}</MenuItem>
            <MenuItem value='es'>Español</MenuItem>
            <MenuItem value='en'>English</MenuItem>
          </Select>
        </FormControl>
        
        <Button className="filterbutton" onClick={this.filter} variant="outlined" > {t("Filter")} </Button>
      </div>
    );
  }
}
export default withTranslation('translation') (Filter);
