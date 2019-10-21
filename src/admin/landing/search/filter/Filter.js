import React, { Component } from 'react';
import Axios from 'axios';
import KeywordSearch from './KeywordSearch';
import UserSearch from './UserSearch';

class Filter extends Component {
    render() {
        return (
            <div>
                <KeywordSearch saveFoundPosts={this.props.saveFoundPosts}/>
                <UserSearch />
            </div>
        );
    }
}

export default Filter;