import React, { Component } from 'react';
class Result extends Component {
    render() {
    let post = this.props.post
        return (<div>
            <div>USERNAME</div>
            <div>{post.title}</div>
            <div>{post.points}</div>
            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>CATEGORY</div>
            <div>IMAGES</div>
            <div>TOWN RESPONSE</div>
        </div>)
    }
}
export default Result;