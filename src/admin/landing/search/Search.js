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
                all: [],
            }, 
            didSearch: {
                filter: false, 
                user: false, 
                keywords: false,
            }, 
            search: {
                filter: false,
                user: false,
                keywords: false,
            }
        }
    }

    executeSearch = () => {
        let search = {...this.state.search}
        search.user = true
        this.setState({search : search})
    }

    saveFoundPosts = async (posts, where) => {
        debugger
        let foundPosts = {...this.state.foundPosts}
        foundPosts[where] = posts
        let didSearch = {...this.state.didSearch}
        didSearch[where] = true
        await this.setState({ foundPosts: foundPosts, didSearch : didSearch  })
    }

    searchDone = async () => {
        debugger
        let foundPosts = {...this.state.foundPosts}
        foundPosts.all = foundPosts.keywords
        let didSearch = {...this.state.didSearch}
        didSearch.filter = false
        didSearch.user = false
        didSearch.keywords = false
        await this.setState({foundPosts : foundPosts, didSearch : didSearch})
    }


    render() {
        return (
            <div>
                <div>Search</div>
                <Filter 
                searchDone={this.searchDone} 
                saveFoundPosts={this.saveFoundPosts} 
                foundPosts={this.state.foundPosts} 
                didSearch={this.state.didSearch}
                search={this.state.search}/>

                <SearchResults foundPosts={this.state.foundPosts} />
            </div>
        );
    }
}

export default Search;