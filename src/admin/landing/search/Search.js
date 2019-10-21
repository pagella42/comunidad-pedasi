import React, { Component } from 'react';
import Filter from './filter/Filter';

class Search extends Component {
    

    render() {
        return (
            <div>
                <div>Search</div>
                <Filter />
            </div>
        );
    }
}

export default Search;