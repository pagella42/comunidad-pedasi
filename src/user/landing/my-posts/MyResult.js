import React, { Component } from 'react';
class MyResult extends Component {
    render() {
        return (<div>
            {this.props.post.title}
        </div>)
    }
}
export default MyResult;