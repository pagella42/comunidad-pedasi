import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SearchResults from './searchResults/SearchResults';
import Filter from './filter/Filter';
import axios from 'axios'
import { withTranslation } from 'react-i18next';

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
        let nothing
        posts.map(post => {
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
        })
        await this.setState({ posts: filteredPosts })
    }

    getPosts = async (filter, keywordOptions, keyword) => {
        let response = await axios.post("http://localhost:4000/data/posts", filter)
        let posts = response.data
        if (posts.length > 0 && keyword !== "") { // if there are no posts already, no point of searching. Same if there is no keyword.
            let options = keywordOptions.filter(keyword => keyword.checked === true)
            await this.searchByKeyword(options, keyword, posts)
        } else {
            await this.setState({ posts: posts })
        }
    }

    render() {
        const { t, i18n } = this.props
        return (
            <div>
                <Link to="/admin"><button onClick={this.logout}>{t("Log out")}</button> </Link>
                <Link to="/admin/explore">{t("Explore")}</Link>
                <Link to="/admin/search">{t("Search")}</Link>
                <Filter getPosts={this.getPosts} />
                {this.state.posts.length > 0 ?
                    <SearchResults foundPosts={this.state.posts} />
                    : <div>{t("No results")}.</div>
                }
            </div>
        );
    }
}

export default withTranslation('translation')(Search);