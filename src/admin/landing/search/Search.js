import React, { Component } from 'react';
import SearchResults from './searchResults/SearchResults';
import Filter from './filter/Filter';
import axios from 'axios'
class Search extends Component {
    constructor(){
        super()
        this.state={
            posts: [],
        }
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
        await this.setState({posts: filteredPosts})
    }

    getPosts = async (filter, keywordOptions, keyword) => {
        let response = await axios.post("http://localhost:4000/data/posts", filter)
        let posts = response.data
        if(posts.length > 0 && keyword !== ""){ // if there are no posts already, no point of searching. Same if there is no keyword.
            let options = keywordOptions.filter(keyword => keyword.checked === true)
            await this.searchByKeyword(options, keyword, posts)
        } else {
            await this.setState({posts : posts}) 
        }
    }

    render() {
        return (
            <div>
                <Filter getPosts={this.getPosts} />
                {this.state.posts.length > 0 ? 
                <SearchResults foundPosts={this.state.posts} />
                : <div>No results.</div>
                }
            </div>
        );
    }
}

export default Search;