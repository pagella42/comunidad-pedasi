import React, { Component } from 'react';
import Axios from 'axios';
import KeywordSearch from './KeywordSearch';

class Filter extends Component {
    render() {
        return (
            <div>
                <KeywordSearch saveFoundPosts={this.props.saveFoundPosts}/>
            </div>
        );
    }
}

export default Filter;