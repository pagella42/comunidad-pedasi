import React, { Component } from "react";
import Axios from "axios";
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './filter.css'
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
                category: 0,
                status: 0,
                language: 0,
                users: [],
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

        this.props.getPosts(this.state.filter, this.state.keywordSearch, this.state.keyword);
    };

    updateSort = async event => {
        await this.setState({
            [event.target.name]: event.target.value
        });
    };

    update = async event => {
        let filter = { ...this.state.filter };
        if (event.target.name === "users") {
            let users = this.state.users.filter(user => user.name.indexOf(event.target.value)!=-1)
            .map(user=>user._id)
            if (users.length > 0) {
                filter.users=users
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
        let response = await Axios.get(CREATE_ROUTE('data/categories'))
        let categories = response.data.map(p => p.name)
        await this.setState({ categories })
    }

    getUsers = async () => {
        let response = await Axios.get(CREATE_ROUTE('data/users'))
        await this.setState({ users: response.data })
    }
    componentDidMount = () => {
        this.getCategories()
        this.getUsers()
    }
    render() {
        const { t, i18n } = this.props
        return (
            <div id="filtercont">
                <Card className='filtercontainer' style={{ maxWidth: 1000 }}>
                    <CardContent>
                        <div class="uppercont">
                            <TextField id="outlined-name" label="Search by Keyword" type="text" name="keyword" margin="normal" variant="outlined" type="string" onChange={this.handleCheckboxChange} />

                            <div>
                                <input type="checkbox" name="search-keyword" id="title" onClick={this.handleCheckboxChange} />
                                <label htmlFor="title-checkbox">{t("title")}</label>


                                <input type="checkbox" name="search-keyword" id="content" onClick={this.handleCheckboxChange} />
                                <label htmlFor="content-checkbox">{t("content")}</label>


                                <input type="checkbox" name="search-keyword" id="comments" onClick={this.handleCheckboxChange} />
                                <label htmlFor="comments-checkbox">{t("comments")}</label>


                                <input type="checkbox" name="search-keyword" id="responses" onClick={this.handleCheckboxChange} />
                                <label htmlFor="responses-checkbox">{t("response")}</label>
                            </div></div>
                        <hr></hr>
                        <TextField id="outlined-name" label="Search by name" list="data" name="users" margin="normal" variant="outlined" type="string" onChange={this.update} />
                        <hr></hr>
                        <div id="sortcont">
                        
                            <FormControl variant="outlined" >
                                <InputLabel htmlFor="outlined-sort-simple">  Sort </InputLabel>
                                <Select  name="sort" onChange={this.updateSort} value={this.state.sort}  id="" labelWidth={75} inputProps={{ name: 'sort', id: 'outlined-category-simple', }} >
                                <MenuItem value="cl">{t("date high to low")}</MenuItem>
                                <MenuItem value="dl">{t("date low to hight")}</MenuItem>
                                <MenuItem value="ph">{t("Points high to low")}</MenuItem>
                                <MenuItem value="pl">{t("Points low to high")}</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <FormControl variant="outlined" >
                                <InputLabel htmlFor="outlined-sort-simple">  Category </InputLabel>
                                <Select  name="category" onChange={this.update} value={this.state.filter.category} id="" labelWidth={75} inputProps={{ name: 'category', id: 'outlined-category-simple', }} >
                                <MenuItem value='All'>{t("All")}</MenuItem>
                                    {this.state.categories.map(c => <MenuItem value={c}>{t(c)}</MenuItem>)}
                                </Select>
                            </FormControl>
                        
                            <FormControl variant="outlined" >
                                <InputLabel htmlFor="outlined-sort-simple">  Status </InputLabel>
                                <Select  name="status" onChange={this.update} value={this.state.filter.status} labelWidth={75} id="" inputProps={{ name: 'status', id: 'outlined-category-simple', }} >
                                <MenuItem value="All">{t("All")}</MenuItem>
                                    <MenuItem value="pending">{t("Pending")}</MenuItem>
                                    <MenuItem value="in progress">{t("In Progress")}</MenuItem>
                                    <MenuItem value="resovled">{t("Resovled")}</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" >
                                <InputLabel htmlFor="outlined-sort-simple">  Language </InputLabel>
                                <Select  name="language" onChange={this.update}  value={this.state.filter.language}  id="" labelWidth={75} inputProps={{ name: 'language', id: 'outlined-category-simple', }} >
                                <MenuItem value="All">{t("All")}</MenuItem>
                                    <MenuItem value="es">Espanol</MenuItem>
                                    <MenuItem value="en">English</MenuItem>
                                </Select>
                            </FormControl>


                                <datalist id="data" name="user">
                                    {this.state.users.map(user => <option value={user.name} key={user._id} />)}
                                </datalist>

        <Button className="filterbutton" onClick={this.filter} variant="outlined" >{t("Send")} </Button>

                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default withTranslation('translation')(Filter);
