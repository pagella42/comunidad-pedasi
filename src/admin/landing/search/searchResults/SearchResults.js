import React, { Component } from 'react';
import Result from '../../../results/Result';

class SearchResults extends Component {
    render() {
        return (
            <div>
                {this.props.foundPosts.length > 0 ? 
                this.props.foundPosts.map(post => <Result post={post}/>) 
                : <div>No results.</div>
            }
            </div>
        );
    }
}

export default SearchResults;