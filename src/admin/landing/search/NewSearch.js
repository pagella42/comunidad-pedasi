import React, { Component } from 'react';
import NewFilter from './filter/NewFilter';
import SearchResults from './searchResults/SearchResults';

class NewSearch extends Component {
    constructor(){
        super()
        this.state = {
            results: []
        }
    }

    saveFinalResult = (data) => {
        this.setState({results: data})
    }

    render() {
        return (
            <div>
                <NewFilter saveFinalResult={this.saveFinalResult}/>
                {this.state.results.length > 0 ? 
                <SearchResults foundPosts={this.state.results} />
                : <div>No results.</div>
                }
            </div>
        );
    }
}

export default NewSearch;