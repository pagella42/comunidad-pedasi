import React, { Component } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import SearchResults from './searchResults/SearchResults';
import Filter from './filter/Filter';
import { withTranslation } from 'react-i18next';
import Header from '../../Header'
import './search.css'
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Consts from '../../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE
class Search extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
        }
    }

    logout = () => {
        let adminLogin = { username: "", isLoggedIn: false }
        localStorage.adminLogin = JSON.stringify(adminLogin)
        this.setState({ adminLogin: adminLogin })
    }

    searchByKeyword = async (options, text, posts) => {
        let searchArray = text.toLowerCase()
        let filteredPosts = []
        let nothing = null
        posts.map(post => 
            options.forEach(option => {
                if (option.name === "comments" || option.name === "responses") {
                    post[option.name].forEach(name => {
                        let value = name.content.toLowerCase()
                        if (value.includes(searchArray)) {
                            filteredPosts.includes(post) ? nothing = null : filteredPosts.push(post)
                        } else { return undefined }
                    })
                } else {
                    let value = post[option.name].toLowerCase()
                    if (value.includes(searchArray)) {
                        filteredPosts.includes(post) ? nothing = null : filteredPosts.push(post)
                    } else { return undefined }
                }
            })
        )
        this.setState({ posts: filteredPosts })
    }

    getPosts = async (filter, keywordOptions, keyword) => {
        let response = await axios.post(CREATE_ROUTE("data/posts"), filter)
        let posts = response.data
        if (posts.length > 0 && keyword !== "") { // if there are no posts already, no point of searching. Same if there is no keyword.
            let options = keywordOptions.filter(keyword => keyword.checked === true)
            await this.searchByKeyword(options, keyword, posts)
        } else {
            this.setState({ posts: posts })
        }
    }

    render() {
        const { t, i18n } = this.props
        return (
            <div>

                <Header/>
            <div id="searchcontainer">
                <div id="searchinner">
                
                {/* <Link to="/admin/explore">{t("Explore")}</Link>
                <Link to="/admin/search">{t("Search")}</Link> */}

                <Filter getPosts={this.getPosts} />
                {this.state.posts.length > 0 ?
                    <SearchResults foundPosts={this.state.posts} />
                    : <div>
                    <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography >{t("No results")}</Typography>
                    </ExpansionPanelSummary></ExpansionPanel></div>
                }

            </div></div></div>
        );

    }
}

export default withTranslation('translation')(Search);