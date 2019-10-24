import React, { Component } from "react";
import axios from "axios";
import { withTranslation } from 'react-i18next';


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
        category: 0,
        status: 0,
        language: 0
      },
      categories: [],
    };
  }
  filter = async () => {
    let filter = {...this.state.filter};
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

    this.setState({ filter });

    this.props.getPosts(this.state.filter);
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
     let response= await  axios.get('http://localhost:4000/data/categories')
     let categories = response.data.map(p => p.name)
     await this.setState({categories})
    
  }

  componentDidMount = () => {
      this.getCategories()
  }
  render() {
    const {t,i18n}=this.props
    return (
      <div>
        <label htmlFor="">{t("sort by")}</label>
        <select
          name="sort"
          onChange={this.updateSort}
          value={this.state.sort}
          id=""
        >
          <option value="dh">{t("date high to low")}</option>
          <option value="dl">{t("date low to high")}</option>
          <option value="ph">{t("Points high to low")}</option>
          <option value="pl">{t("Points low to high")}</option>
        </select>
        <label htmlFor="">{t("category")}</label>
        <select
          name="category"
          onChange={this.update}
          value={this.state.filter.category}
          id=""
        >
            <option value=''>{t("All")}</option>
            {this.state.categories.map(c => <option value={c.toLowerCase()}>{t(c)}</option>)}

        </select>

        <label htmlFor="">{t("Status")}</label>
        <select
          name="status"
          onChange={this.update}
          value={this.state.filter.status}
          id=""
        >
          <option value="">{t("All")}</option>
          <option value="pending">{t("Pending")}</option>
          <option value="in progress">{t("In progress")}</option>
          <option value="resolved">{t("Resolved")}</option>
        </select>

        <label htmlFor="">{t("language")}</label>
        <select
          name="language"
          onChange={this.update}
          value={this.state.filter.language}
          id=""
        >
          <option value="">{t("All")}</option>
          <option value="es">Espanol</option>
          <option value="en">English</option>
        </select>
        <button onClick={this.filter}>{t("Send")}</button>
      </div>
    );
  }
}
export default withTranslation('translation') (Filter);
