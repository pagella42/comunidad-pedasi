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
        debugger
        this.props.executeSearch()
    }

    doNotExecute = (what) => {
        this.setState({[what] : false})
    }

   async componentDidUpdate(){
        debugger
        if(this.props.didSearch.filter){
            this.setState({executeUserSearch: true, executeFilterSearch: false})
        } else if (this.props.didSearch.user){
            this.setState({executeKeywordSearch: true, executeUserSearch: false})
        } else if(this.props.didSearch.keywords){
            await this.setState({ executeKeywordSearch : false})
            this.props.searchDone()
        }
    }

    render() {
        return (
            <div>
                <UserSearch 
                search={this.props.search.user}
                executeUserSearch={this.state.executeUserSearch} 
                saveFoundPosts={this.props.saveFoundPosts} 
                posts={this.props.foundPosts.filter} 
                didSearch={this.props.didSearch.filter} 
                doNotExecute={this.doNotExecute}/>
                
                <KeywordSearch 
                executeKeywordSearch={this.state.executeKeywordSearch} 
                saveFoundPosts={this.props.saveFoundPosts} 
                posts={this.props.foundPosts.user} 
                didSearch={this.props.didSearch.user} />
                <button onClick={this.executeSearch}>Search</button>
                {/* button on click search first in filter search, than user search and then keyword search.  */}
            </div>
        );
    }
}

export default Filter;