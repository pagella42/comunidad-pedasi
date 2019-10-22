import React, { Component } from 'react';
import SearchResults from './searchResults/SearchResults';
import NewNewFilter from './filter/NewNewFilter';
import axios from 'axios'
class NewNewSearch extends Component {
    constructor(){
        super()
        this.state={
            posts: [],
        }
    }

    getPosts = async (filter) => {
        let response = await axios.post("http://localhost:4000/data/posts", filter)
        let posts = response.data
        await this.setState({posts : posts}) 
    }

    render() {
        return (
            <div>
                <NewNewFilter getPosts={this.getPosts} />
                {/* {this.state.results.length > 0 ? 
                <SearchResults foundPosts={this.state.results} />
                : <div>No results.</div>
                } */}
            </div>
        );
    }
}

export default NewNewSearch;