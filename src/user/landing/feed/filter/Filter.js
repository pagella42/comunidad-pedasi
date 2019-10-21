import React, { Component } from "react";
class Filter extends Component {
  constructor() {
    super();
    this.state = {
      sort: "dh",
      filter: {
        sort: {
          by: "date",
          order: 1
        },
        category: "All",
        status: "All",
        language: "All"
      }
    };
  }
  filter = async () => {
    let filter = this.state.filter;
    switch (this.state.sort) {
      case "dh":
        filter.sort.by = "date";
        filter.sort.order = 1;

        break;
      case "dl":
        filter.sort.by = "date";
        filter.sort.order = -1;

        break;
      case "ph":
        filter.sort.by = "points";
        filter.sort.order = 1;

        break;
      case "pl":
        filter.sort.by = "points";
        filter.sort.order = -1;

        break;
      default:
        console.log("nothing");
    }

    this.setState({ filter });

    this.props.getPosts(this.state.filter);
    console.log(this.state.filter);
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
      filter
    });
  };
  render() {
    return (
      <div>
          <label htmlFor="">sort by</label>
        <select
          name="sort"
          onChange={this.updateSort}
          value={this.state.sort}
          id=""
        >
          <option value="dh">date high to low</option>
          <option value="dl">date low to hight</option>
          <option value="ph">Points hight low</option>
          <option value="pl">Points low to high</option>
        </select>
        <label htmlFor="">category</label>
        <select
          name="category"
          onChange={this.update}
          value={this.state.filter.category}
          id=""
        >
          <option value="All">All</option>
          <option value="Disorderly Conduct">Disorderly Conduct</option>
          <option value="General">General</option>
          <option value="Noise">Noise</option>
          <option value="Public Disturbance"></option>
          <option value="Tresspassing"></option>
          <option value="Utilities">Utilities</option>
          <option value="Violence">Violence</option>
        </select>

        <label htmlFor="">status</label>
        <select
          name="status"
          onChange={this.update}
          value={this.state.filter.status}
          id=""
        >
          <option value="All">All</option>
          <option value="pending aproval">pending aproval</option>
          <option value="in discussion">In Discussion</option>
          <option value="Resovled">Resovled</option>
        </select>

        <label htmlFor="">language</label>
        <select
          name="language"
          onChange={this.update}
          value={this.state.filter.language}
          id=""
        >
          <option value="All">All</option>
          <option value="Espanol">Espanol</option>
          <option value="en">English</option>
        </select>
        <button onClick={this.filter}>Send</button>
      </div>
    );
  }
}
export default Filter;
