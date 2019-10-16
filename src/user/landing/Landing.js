import React, { Component } from 'react';
import CreatePost from './create-post/CreatePost'
import Feed from './feed/Feed';
class Landing extends Component {
    render() {
        return (<div>
            // Landing User
            <CreatePost/>
            <Feed/>
        </div>)
    }
}
export default Landing;