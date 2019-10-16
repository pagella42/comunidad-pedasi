import React, { Component } from 'react';
class Result extends Component {
    render() {
        data = this.props.data
        return (<div>
            <div>USERNAME</div>
            <div>TITLE</div>
            <div>LIKES</div>
            <div>CONTENT</div>
            <div>LOCATION</div>
            <div>CATEGORY</div>
            <div>IMAGES</div>
            <div>TOWN RESPONSE</div>
        </div>)
    }
}
export default Result;