import React, { Component } from 'react';
class Result extends Component {
    render() {
    let post = this.props.post
        return (<div>
            <br/>
            <div>{post.user.name}</div>
            <div>{post.title}</div>
            <div>{post.points}</div>
            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture || 'http://via.placeholder.com/300x150'} alt="concern"/></div>
            <div>TOWN RESPONSE</div>
            <br/>
        </div>)
    }
}
export default Result;