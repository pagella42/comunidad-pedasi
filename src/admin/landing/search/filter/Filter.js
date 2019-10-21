import React, { Component } from 'react';
import Axios from 'axios';
import KeywordSearch from './KeywordSearch';
import UserSearch from './UserSearch';

class Filter extends Component {
    constructor() {
        super()
        this.state = {
            executeFilterSearch: false,
            executeUserSearch: false,
            executeKeywordSearch: false,
        }
    }

    executeSearch = () => {
        this.setState({ executeUserSearch: true })
    }

    componentDidUpdate(){
        if(this.props.didSearch.filter){
            this.setState({executeUserSearch: true})
        } else if (this.props.didSearch.user){
            this.setState({executeKeywordSearch: true})
        } else if(this.props.didSearch.keywords){
            this.props.searchDone()
        }
    }

    render() {
        return (
            <div>
                <KeywordSearch executeKeywordSearch={this.state.executeKeywordSearch} saveFoundPosts={this.props.saveFoundPosts} posts={this.props.foundPosts.user} />
                <UserSearch executeUserSearch={this.state.executeUserSearch} saveFoundPosts={this.props.saveFoundPosts} posts={this.props.foundPosts.filter} didSearch={this.props.didSearch.filter} />
                <button onClick={this.executeSearch}>Search</button>
                {/* button on click search first in filter search, than user search and then keyword search.  */}
            </div>
        );
    }
}

export default Filter;