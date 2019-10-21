import React, { Component } from 'react';
import Filter from './filter/Filter';
import SearchResults from './searchResults/SearchResults';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            foundPosts: [],
        }
    }

    saveFoundPosts = (posts) => {
        this.setState({foundPosts : posts})
    }

    render() {
        return (
            <div>
                <div>Search</div>
                <Filter saveFoundPosts={this.saveFoundPosts}/>
                <SearchResults foundPosts={this.state.foundPosts}/>
            </div>
        );
    }
}

export default Search;