import React, { Component } from 'react';
import Filter from './filter/Filter';
import SearchResults from './searchResults/SearchResults';

class Search extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            foundPosts: {
                filter: [], 
                user: [],
                keywords: [],
                done: [],
            }
        }
    }

    saveFoundPosts = (posts, where) => {
        let foundPosts = {...this.state.foundPosts}
        foundPosts[where] = posts
        this.setState({ foundPosts: posts })
    }

    render() {
        return (
            <div>
                <div>Search</div>
                <Filter saveFoundPosts={this.saveFoundPosts} foundPosts={this.state.foundPosts.user} />
                <SearchResults foundPosts={this.state.foundPosts} />
                {/* Need to add hierarchy:  first user, then filtering, then keywords */}
            </div>
        );
    }
}

export default Search;