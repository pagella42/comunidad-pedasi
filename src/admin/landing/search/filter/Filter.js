import React, { Component } from 'react';
import Axios from 'axios';
import KeywordSearch from './KeywordSearch';
import UserSearch from './UserSearch';

class Filter extends Component {
    constructor(){
        super()
        this.state = {
            executeFilterSearch: false,
            executeUserSearch: false,
            executeKeywordSearch: false,
        }
    }

    isFilteredByUser = () => {

    }

    executeSearch = () => {
        this.setState({executeFilterSearch: true})
    }

    render() {
        return (
            <div>
                <KeywordSearch executeKeywordSearch={this.state.executeKeywordSearch} saveFoundPosts={this.props.saveFoundPosts} posts={this.props.foundPostsUser}/>
                <UserSearch executeUserSearch={this.state.executeUserSearch} saveFoundPosts={this.props.saveFoundPosts} posts={this.props.foundPostsFilter}/>
                <button onClick={this.executeSearch}>Search</button>
                {/* button on click search first in filter search, than user search and then keyword search.  */}
            </div>
        );
    }
}

export default Filter;