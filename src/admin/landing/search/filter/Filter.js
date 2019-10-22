import React, { Component } from "react";
import Axios from "axios";
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
                category: 0,
                status: 0,
                language: 0,
                user: 0,
            },
            categories: [],
            users: [],
            keywordSearch: [
                { name: "title", checked: false },
                { name: "content", checked: false },
                { name: "comments", checked: false },
                { name: "responses", checked: false },
            ],
            keyword: "",
        };
    }
    filter = async () => {
        let filter = { ...this.state.filter };
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
                filter.sort.order = -1;

                break;
            case "pl":
                filter.sort.by = "points";
                filter.sort.order = 1;

                break;
            default:
                filter.sort.by = "date";
                filter.sort.order = 1;
                break;
        }

        this.setState({ filter });

        this.props.getPosts(this.state.filter, this.state.keywordSearch, this.state.keyword);
    };

    updateSort = async event => {
        await this.setState({
            [event.target.name]: event.target.value
        });
    };

    update = async event => {
        let filter = { ...this.state.filter };
        if (event.target.name === "user") {
            let user = this.state.users.filter(user => user.name === event.target.value)
            if(user.length > 0){
                filter[event.target.name] = user[0]._id
            }
        } else {
            filter[event.target.name] = event.target.value
        }
        await this.setState({
            filter
        });
    };


    handleCheckboxChange = async (e) => {
        let name = e.target.name
        if (name === "search-keyword") {
            let choice = e.target.id
            let checked = e.target.checked

            let keywordSearch = [...this.state.keywordSearch]
            let keywordIndex = keywordSearch.findIndex(keyword => keyword.name === choice)
            keywordSearch[keywordIndex].checked = checked
            await this.setState({ keywordSearch: keywordSearch })

        } else {
            let value = e.target.value
            await this.setState({ [name]: value })
        }
    }

    getCategories = async () => {
        let response = await Axios.get('http://localhost:4000/data/categories')
        let categories = response.data.map(p => p.name)
        await this.setState({ categories })
    }

    getUsers = async () => {
        let response = await Axios.get('http://localhost:4000/data/users')
        await this.setState({ users: response.data })
    }
    componentDidMount = () => {
        this.getCategories()
        this.getUsers()
    }
    render() {
        return (
            <div>
                <div>
                    <input type="text" name="keyword" placeholder="Search by Keyword" onChange={this.handleCheckboxChange} />
                    <div>
                        <input type="checkbox" name="search-keyword" id="title" onClick={this.handleCheckboxChange} />
                        <label htmlFor="title-checkbox">title</label>
                    </div>
                    <div>
                        <input type="checkbox" name="search-keyword" id="content" onClick={this.handleCheckboxChange} />
                        <label htmlFor="content-checkbox">content</label>
                    </div>
                    <div>
                        <input type="checkbox" name="search-keyword" id="comments" onClick={this.handleCheckboxChange} />
                        <label htmlFor="comments-checkbox">comments</label>
                    </div>
                    <div>
                        <input type="checkbox" name="search-keyword" id="responses" onClick={this.handleCheckboxChange} />
                        <label htmlFor="responses-checkbox">responses</label>
                    </div>
                </div>
                <br />
                <label htmlFor="">sort by</label>
                <select
                    name="sort"
                    onChange={this.updateSort}
                    value={this.state.sort}
                    id=""
                >
                    <option value="cl">date high to low</option>
                    <option value="dl">date low to hight</option>
                    <option value="ph">Points high to low</option>
                    <option value="pl">Points low to high</option>
                </select>
                <label htmlFor="">category</label>
                <select
                    name="category"
                    onChange={this.update}
                    value={this.state.filter.category}
                    id=""
                >
                    <option value=''>All</option>
                    {this.state.categories.map(c => <option value={c.toLowerCase()}>{c}</option>)}

                </select>

                <label htmlFor="">status</label>
                <select
                    name="status"
                    onChange={this.update}
                    value={this.state.filter.status}
                    id=""
                >
                    <option value="">All</option>
                    <option value="pending">pending</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Resovled">Resovled</option>
                </select>

                <label htmlFor="">language</label>
                <select
                    name="language"
                    onChange={this.update}
                    value={this.state.filter.language}
                    id=""
                >
                    <option value="">All</option>
                    <option value="es">Espanol</option>
                    <option value="en">English</option>
                </select>

                <label htmlFor="">User</label>
                <input type="text" list="data" name="user" placeholder="User name" onChange={this.update} />
                <datalist id="data" name="user">
                    {this.state.users.map(user => <option value={user.name} key={user._id} />)}
                </datalist>

                <button onClick={this.filter}>Send</button>
            </div>
        );
    }
}
export default Filter;
